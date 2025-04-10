import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../api/userApi";
import CreateUser from "../components/User/CreateUser";
import UpdateUser from "../components/User/UpdateUser";
import { Link } from "react-router-dom";


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [expandedUserId, setExpandedUserId] = useState(null); // for showing user info

  const fetchAllUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchTrigger]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setFetchTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleCreateUser = () => setIsCreatingUser(true);

  const handleUserCreated = () => {
    setFetchTrigger(prev => prev + 1);
    setIsCreatingUser(false);
  };

  const handleCancel = () => {
    setIsCreatingUser(false);
    setUpdatingUserId(null);
  };

  const handleUpdateUser = (userId) => setUpdatingUserId(userId);

  const handleUserUpdated = () => {
    setFetchTrigger(prev => prev + 1);
    setUpdatingUserId(null);
  };

  const toggleUserInfo = (userId) => {
    setExpandedUserId(prev => (prev === userId ? null : userId));
  };

  const formClasses = "max-w-md mx-auto bg-white p-6 rounded-md shadow-md";
  const inputClasses = "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";
  const buttonClasses = "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-blue-200 min-h-screen">
      {!isCreatingUser && !updatingUserId ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Users</h2>
            <button
              onClick={handleCreateUser}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Create User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Username</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                     <td className="px-4 py-2 border-b">
                        <Link
                          to={`/users/${user.userId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {user.username}
                        </Link>
                      </td>

                      <td className="px-4 py-2 border-b space-x-2">
                        <button
                          onClick={() => handleUpdateUser(user.userId)}
                          className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(user.userId)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>

                      {expandedUserId === user.userId && (
                        <tr className="bg-gray-100 text-sm text-gray-700">
                          <td colSpan="3" className="px-4 py-2 border-t">
                            <div><strong>Email:</strong> {user.email || "N/A"}</div>
                            <div><strong>Role:</strong> {user.role || "User"}</div>
                            <div><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</div>
                          </td>
                        </tr>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : isCreatingUser ? (
        <CreateUser
          setUsers={handleUserCreated}
          formClasses={formClasses}
          inputClasses={inputClasses}
          buttonClasses={buttonClasses}
          handleCancel={handleCancel}
        />
      ) : (
        <UpdateUser
          userId={updatingUserId}
          onUserUpdated={handleUserUpdated}
          formClasses={formClasses}
          inputClasses={inputClasses}
          buttonClasses={buttonClasses}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UsersPage;
