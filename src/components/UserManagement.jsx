const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@azurii.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@azurii.com', role: 'Editor', status: 'Inactive' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });

  const handleCreateUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1, status: 'Active' }]);
    setNewUser({ name: '', email: '', role: 'User' });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      
      {/* User Creation Form */}
      <div className="mb-6 space-y-3">
        <h3 className="font-medium">Add New User</h3>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
        />
        <select 
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={newUser.role}
          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
        >
          <option value="User">User</option>
          <option value="Editor">Editor</option>
          <option value="Admin">Admin</option>
        </select>
        <button 
          onClick={handleCreateUser}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Create User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-400 hover:text-blue-300">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};