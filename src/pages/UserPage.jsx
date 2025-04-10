import { useEffect, useState } from "react";
import { deleteUser, fetchUsers, updateUser } from "../api/userApi";
import CreateUser from "../components/User/CreateUser";
import UpdateUser from "../components/User/UpdateUser";
import { Button } from "@/components/ui/button";




const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null); // New state for updating user
  const [fetchTrigger, setFetchTrigger] = useState(0); // State to trigger re-fetch

  const fetchAllUsers = async () => {
    try {
      const data = await fetchUsers();
      console.log("Fetched users:", data); // Debug log
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err); // Log errors
      setError("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchTrigger]); // Add fetchTrigger to the dependency array

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setFetchTrigger(prev => prev + 1); // Increment fetchTrigger to trigger re-fetch
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleCreateUser = () => {
    setIsCreatingUser(true);
  };

  const handleUserCreated = (createdUser) => {
    setFetchTrigger(prev => prev + 1); // Increment fetchTrigger to trigger re-fetch
    setIsCreatingUser(false);
  };

  const handleCancel = () => {
    setIsCreatingUser(false);
    setUpdatingUserId(null); // Reset updating user ID
  };

  const handleUpdateUser = (userId) => {
    setUpdatingUserId(userId);
  };

  const handleUserUpdated = () => {
    setFetchTrigger(prev => prev + 1); // Increment fetchTrigger to trigger re-fetch
    setUpdatingUserId(null);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  const formClasses = "max-w-md mx-auto bg-white p-6 rounded-md shadow-md";
  const inputClasses = "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";
  const buttonClasses = "w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";

  return (
    <div className="container mx-auto p-4">
      {!isCreatingUser && !updatingUserId ? (
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
                <th className="px-4 py-2 border-b text-left">ID</th>
                <th className="px-4 py-2 border-b text-left">Username</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-100 text-left">
                      <td className="px-4 py-2 border-b text-left">{user.userId}</td>
                      <td className="px-4 py-2 border-b text-left">{user.username}</td>
                      <td className="px-4 py-2 border-b">
                        <button 
                          onClick={() => handleUpdateUser(user.userId)} 
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => handleDelete(user.userId)} 
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                        >
                          Delete
                        </button>
                        <button 
                          
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                          User Info 
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