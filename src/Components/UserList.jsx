import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../api/userApi";
import CreateUser from "./User/CreateUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <CreateUser setUsers={setUsers} /> {/* Pass setUsers as a prop */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles.map((role) => role.roleName).join(", ")}</td>
                <td>
                  <button onClick={() => handleDelete(user.userId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;