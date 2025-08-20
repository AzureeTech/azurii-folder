import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc, 
  addDoc 
} from 'firebase/firestore';
import { db, secondaryAuth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  fetchSignInMethodsForEmail 
} from 'firebase/auth';

const UserManagement = ({ subPanel }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: '', email: '', role: 'User' });
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [subPanel]);

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email) return toast.error('All fields required');
    setLoading(true);

    try {
      const methods = await fetchSignInMethodsForEmail(secondaryAuth, newUser.email);
      if (methods.length > 0) throw new Error('Email already in use');

      const tempPassword = generateTempPassword();
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newUser.email, tempPassword);

      await addDoc(collection(db, 'users'), {
        ...newUser,
        uid: userCredential.user.uid,
        status: 'Active',
        createdAt: new Date().toISOString()
      });

      await sendPasswordResetEmail(secondaryAuth, newUser.email);
      setUsers([...users, { ...newUser, status: 'Active' }]);
      setNewUser({ name: '', email: '', role: 'User' });
      toast.success('User created and reset email sent');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editUserData.name || !editUserData.email) return toast.error('All fields required');
    try {
      const userRef = doc(db, 'users', editingUserId);
      await updateDoc(userRef, editUserData);
      setUsers(users.map(u => u.id === editingUserId ? { ...u, ...editUserData } : u));
      setEditingUserId(null);
      toast.success('User updated');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(u => u.id !== userId));
      toast.success('User deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success('Role updated');
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const renderView = () => {
    if (subPanel === 'add-user') {
      return (
        <div className="p-4 bg-white text-black rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-3">Add New User</h3>
          <input type="text" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="Name" className="block w-full p-2 border mb-2 rounded" />
          <input type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" className="block w-full p-2 border mb-2 rounded" />
          <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="block w-full p-2 border mb-4 rounded">
            <option>User</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>
          <button onClick={handleCreateUser} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{loading ? 'Creating...' : 'Create'}</button>
        </div>
      );
    }

    if (subPanel === 'manage-roles') {
      return (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border text-left text-white bg-gray-800">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">New Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-gray-600">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <select value={user.role} onChange={e => handleRoleUpdate(user.id, e.target.value)} className="text-black p-1 rounded">
                      <option>User</option>
                      <option>Editor</option>
                      <option>Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm text-left text-white border bg-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => {
                    setEditingUserId(user.id);
                    setEditUserData({ name: user.name, email: user.email, role: user.role });
                  }} className="text-blue-400 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {editingUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-black mb-4">Edit User</h2>
            <input value={editUserData.name} onChange={e => setEditUserData({ ...editUserData, name: e.target.value })} placeholder="Name" className="block w-full p-2 border mb-2 rounded text-black" />
            <input value={editUserData.email} onChange={e => setEditUserData({ ...editUserData, email: e.target.value })} placeholder="Email" className="block w-full p-2 border mb-2 rounded text-black" />
            <select value={editUserData.role} onChange={e => setEditUserData({ ...editUserData, role: e.target.value })} className="block w-full p-2 mb-4 border rounded text-black">
              <option>User</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingUserId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleUpdateUser} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
      {renderView()}
    </div>
  );
};

export default UserManagement;
