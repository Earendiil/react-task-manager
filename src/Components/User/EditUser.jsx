import { useState, useEffect } from "react";
import { fetchUserById, updateUser } from "../api/userApi";

const EditUserForm = ({ userId, setUsers }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserById(userId)
      .then((user) => {
        setUsername(user.username);
        setEmail(user.email);
      })
      .catch((err) => setError("Error fetching user data"));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { username, email };

    try {
      const updated = await updateUser(userId, updatedUser);
      setUsers((prevUsers) => 
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, ...updated } : user
        )
      );
    } catch (err) {
      setError("Error updating user.");
    }
  };

  return (
    <div>
      <h3>Edit User</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUserForm;
