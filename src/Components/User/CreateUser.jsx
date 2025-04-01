import { useState, useEffect, useRef } from "react";
import { createUser } from "../../api/userApi";

const CreateUser = ({ setUsers, formClasses, inputClasses, buttonClasses, handleCancel }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
      roles: [{ roleName: role }],
    };

    try {
      const createdUser = await createUser(newUser);
      setUsers(createdUser);
    } catch (error) {
      console.error("Error creating user", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={formClasses}>
      <h3 className="text-xl font-semibold mb-4">Add New User</h3>

      <div className="mb-4">
        <label className="block text-gray-700">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={inputClasses}
          ref={usernameRef}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClasses}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputClasses}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className={inputClasses}
        >
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="submit"
          className={`${buttonClasses} mr-2`}
        >
          Create User
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateUser;