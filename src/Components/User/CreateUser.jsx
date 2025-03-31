import { useState } from "react";
import { createUser } from "../../api/userApi.js"; // Adjust according to your API


const CreateUserForm = ({ setUsers, setIsFormVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password field
  const [role, setRole] = useState("ROLE_USER");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const newUser = { username, email, password, roles: [{ roleName: role }] };

    try {
      const createdUser = await createUser(newUser); // API call
      setUsers((prevUsers) => [...prevUsers, createdUser]); // Add new user to list
      setIsFormVisible(false); // Hide form after submission
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 shadow-md">
      <h3>Add New User</h3>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label> {/* Added password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="submit" style={{ marginRight: "10px", cursor: "pointer" }}>
          Create User
        </button>
        <button
          type="button"
          onClick={() => setIsFormVisible(false)}
          style={{ cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;