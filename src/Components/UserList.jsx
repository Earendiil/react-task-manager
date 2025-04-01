import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../api/userApi";
import CreateUser from "./User/CreateUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        console.log("Fetched users:", data); // Debug log
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err); // Log errors
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleCreateUser = () => {
    setIsCreatingUser(true);
  };

  const handleUserCreated = (createdUser) => {
    setUsers((prevUsers) => [...prevUsers, createdUser]);
    setIsCreatingUser(false);
  };

  const handleCancel = () => {
    setIsCreatingUser(false);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  const formClasses = "max-w-md mx-auto bg-white p-6 rounded-md shadow-md";
  const inputClasses = "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";
  const buttonClasses = "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";

  return (
    <div className="container mx-auto p-4">
      {!isCreatingUser ? (
        <>
          <h2 className="text-2xl font-bold mb-4">User List</h2>
          <button
            onClick={handleCreateUser}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Create User
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Username</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Roles</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{user.userId}</td>
                      <td className="px-4 py-2 border-b">{user.username}</td>
                      <td className="px-4 py-2 border-b">{user.email}</td>
                      <td className="px-4 py-2 border-b">{user.roles.map((role) => role.roleName).join(", ")}</td>
                      <td className="px-4 py-2 border-b">
                        <button 
                          onClick={() => handleDelete(user.userId)} 
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 border-b text-center">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <CreateUser 
          setUsers={handleUserCreated} 
          formClasses={formClasses} 
          inputClasses={inputClasses} 
          buttonClasses={buttonClasses} 
          handleCancel={handleCancel} 
        />
      )}
    </div>
  );
};

export default UserList;