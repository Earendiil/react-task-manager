import { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../../api/userApi";

const UpdateUser = ({ userId, onUserUpdated, formClasses, inputClasses, buttonClasses, handleCancel }) => {
    const [user, setUser] = useState({ username: "", email: "", password: "", roles: [{ roleName: "ROLE_USER" }] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
  
    useEffect(() => {
      fetchUserById(userId)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching the user: ", err);
          setError("Failed to load user");
          setLoading(false);
        });
    }, [userId]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const handleRoleChange = (e) => {
      const { value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        roles: [{ roleName: value }],
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const updatedUser = await updateUser(userId, user);
        onUserUpdated(updatedUser);
        setIsUpdated(true);
        setLoading(false);
      } catch (err) {
        console.error("Error updating the user: ", err);
        setError("Failed to update user");
        setLoading(false);
      }
    };
  
    if (loading) return <p>Loading user...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <form onSubmit={handleSubmit} className={formClasses}>
        <h3 className="text-xl font-semibold mb-4">Update User</h3>
        {isUpdated && <p className="text-green-500 mb-4">User updated successfully!</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <select
            name="role"
            value={user.roles[0].roleName}
            onChange={handleRoleChange}
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
            Update User
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
  
  export default UpdateUser;