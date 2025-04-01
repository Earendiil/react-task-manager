import { useState } from "react";
import { createUser } from "../../api/userApi";


const CreateUser = ({ setUsers }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER"); // Default role is "User"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      username,
      email,
      password,
      roles: [{ roleName: role }], // Include role in user data
    };

    try {
      const createdUser = await createUser(newUser);
      setUsers((prevUsers) => [...prevUsers, createdUser]);
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New User</h3>

      <div>
        <label>Username: </label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="submit" style={{ marginRight: "10px", cursor: "pointer" }}>
          Create User
        </button>
      </div>
    </form>
  );
};

export default CreateUser;