import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, getUserTasks } from "@/api/userApi";  
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user details
        const data = await getUserById(id);
        setUser(data);

        // Fetch user tasks (if not already included in the user data)
        const userTasks = data.tasks || [];  // Use the tasks from user data if available
        setTasks(userTasks);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user or tasks:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6 bg-blue-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <p><strong>ID:</strong> {user.userId}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {/* Display roles */}
      <h3 className="text-xl font-semibold mt-6">Roles</h3>
      {user.roles && user.roles.length > 0 ? (
        <ul>
          {user.roles.map((role) => (
            <li key={role.roleId}>
              <p><strong>Role Name:</strong> {role.roleName === "ROLE_ADMIN" ? "Admin" : "User"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No roles assigned</p>
      )}

      {/* Display tasks */}
      <h3 className="text-xl font-semibold mt-6">Tasks</h3>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.taskId} className="border-b py-2">
              <p><strong>Task:</strong> {task.title}</p>
              <p><strong>Status:</strong>   {task.completed  ? (
                                      <span className="text-green-500 flex items-center">
                                        <FaCheckCircle className="mr-1" /> Completed
                                      </span>
                                    ) : (
                                      <span className="text-yellow-500 flex items-center">
                                        <FaHourglassHalf className="mr-1" /> Pending
                                      </span>
                                    )}</p>
              {/* Add Task Details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned</p>
      )}
    </div>
  );
};

export default UserDetailPage;
