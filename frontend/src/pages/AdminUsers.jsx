import { useEffect, useState, useContext } from 'react';
import axios from '../services/axios';
import AdminNavbar from '../components/AdminNavbar';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [updating, setUpdating] = useState(null);
  const { user: currentAdmin } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      alert('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setUpdating(userId);
    try {
      await axios.put(`/api/users/${userId}`, { type: newRole });
      alert('Role updated');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/api/users/${userId}`);
      alert('User deleted');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">All Registered Users </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Current Role</th>
                  <th className="px-6 py-3 text-left font-semibold">Change Role</th>
                  <th className="px-6 py-3 text-left font-semibold">Delete</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4 capitalize">{u.type}</td>

                    <td className="px-6 py-4">
                      {(u.type === 'admin' || u._id === currentAdmin._id) ? (
                        <span className="text-gray-400 text-sm">N/A</span>
                      ) : (
                        <select
                          value={u.type}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          disabled={updating === u._id}
                          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                        </select>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {(u.type !== 'admin' && u._id !== currentAdmin._id) ? (
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
