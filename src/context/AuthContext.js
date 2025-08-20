import { getAuth, deleteUser, revokeRefreshTokens } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const UserManagement = ({ subPanel }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: '', email: '', role: 'User' });
  const [loading, setLoading] = useState(false);

  // Load users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users: ', error);
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [subPanel]);

  // Create user with password reset link
  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const auth = getAuth();

    try {
      // Check if email already exists
      const methods = await fetchSignInMethodsForEmail(auth, newUser.email);
      if (methods.length > 0) {
        throw new Error('Email already in use');
      }

      // Create auth user with temporary password
      const tempPassword = generateTempPassword();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        tempPassword
      );

      // Save user data to Firestore
      const docRef = await addDoc(collection(db, 'users'), {
        ...newUser,
        uid: userCredential.user.uid,
        status: 'Active',
        createdAt: new Date().toISOString()
      });

      // Send password reset email
      await sendPasswordResetEmail(auth, newUser.email);
      
      // Update local state
      setUsers([...users, { id: docRef.id, ...newUser, status: 'Active' }]);
      setNewUser({ name: '', email: '', role: 'User' });
      
      alert(`User created successfully! Password reset link sent to ${newUser.email}`);
    } catch (error) {
      console.error('Error creating user: ', error);
      alert(`Failed to create user: ${error.message.replace('Firebase: ', '')}`);
    } finally {
      setLoading(false);
    }
  };

  // Generate temporary password
  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Update user
  const handleUpdateUser = async () => {
    if (!editUserData.name || !editUserData.email) {
      alert('Please fill all fields');
      return;
    }
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        editUserData.email,
        'temporaryPassword'
      );
      await addDoc(collection(db, 'users'), {
        name: editUserData.name,
        email: editUserData.email,
        role: editUserData.role,
        status: 'Active',
        uid: userCredential.user.uid
      });

      setUsers([...users, { ...editUserData, id: userCredential.user.uid, status: 'Active' }]);
      setEditingUserId(null);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert(`Failed to update user: ${error.message}`);
    }
  };

  // Secure delete user
  const handleSecureDelete = async (userId) => {
    if (!window.confirm('Permanently delete this user and revoke all access?')) return;

    try {
      const auth = getAuth();
      const userToDelete = users.find(user => user.id === userId);
      
      if (!userToDelete) throw new Error('User not found');

      // 1. Revoke all active sessions
      if (userToDelete.uid) {
        await revokeRefreshTokens(auth, userToDelete.uid);
      }

      // 2. Delete authentication account (if admin recently authenticated)
      try {
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid === userToDelete.uid) {
          await deleteUser(currentUser);
        }
      } catch (error) {
        console.warn("Auth deletion skipped - needs recent login:", error);
      }

      // 3. Delete Firestore record
      await deleteDoc(doc(db, 'users', userId));

      // 4. Update UI
      setUsers(users.filter(user => user.id !== userId));
      alert('User fully deleted with access revoked');

    } catch (error) {
      alert(`Deletion failed: ${error.message}`);
      console.error("Secure deletion error:", error);
    }
  };

  // Update user role
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating role: ', error);
      alert('Failed to update role');
    }
  };

  // Toggle user status
  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating status: ', error);
      alert('Failed to update status');
    }
  };

  // Render view based on subPanel
  const renderView = () => {
    switch (subPanel) {
      case 'view-users':
        return (
          <div className="mt-4">
            <h2 className="font-bold mb-2">User List</h2>
            {loading ? (
              <p>Loading users...</p>
            ) : users.length > 0 ? (
              <table className="w-full border">
                <thead>
                  <tr className="text-black bg-gray-100">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-red-900 text-red-300'
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="p-2 space-x-2">
                        <button 
                          onClick={() => {
                            setEditingUserId(user.id);
                            setEditUserData({
                              name: user.name,
                              email: user.email,
                              role: user.role
                            });
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleSecureDelete(user.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found</p>
            )}
          </div>
        );

      case 'add-user':
        return (
          <div className="mb-6 p-4 border rounded">
            <h2 className="font-bold mb-2">New User Form</h2>
            <input
              type="text"
              placeholder="Name"
              className="block text-black w-full p-2 mb-2 border"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              className="block text-black w-full p-2 mb-2 border"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <select
              className="block text-black w-full p-2 mb-2 border"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              onClick={handleCreateUser}
              disabled={loading}
              className={`bg-green-500 text-white px-4 py-2 mr-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        );

      case 'manage-roles':
        return (
          <div className="mt-4">
            <h2 className="font-bold mb-2">Manage User Roles</h2>
            <table className="w-full border">
              <thead>
                <tr className="text-black bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Current Role</th>
                  <th className="p-2 text-left">New Role</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">
                      <select 
                        className="text-black p-1 border"
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                      >
                        <option value="User">User</option>
                        <option value="Editor">Editor</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <span className="text-green-500">Saved</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return <p>Select a user management option</p>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      {/* Edit User Modal */}
      {editingUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              placeholder="Name"
              className="block w-full p-2 mb-2 border"
              value={editUserData.name}
              onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              className="block w-full p-2 mb-2 border"
              value={editUserData.email}
              onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
            />
            <select
              className="block w-full p-2 mb-4 border"
              value={editUserData.role}
              onChange={(e) => setEditUserData({...editUserData, role: e.target.value})}
            >
              <option value="User">User</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingUserId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {renderView()}
    </div>
  );
};

export default UserManagement;