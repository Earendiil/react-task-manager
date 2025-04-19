import { useState, useEffect } from "react";
import TaskCard from "@/components/Task/TaskCard"; 
import { getUserTasks, getAllUsers } from "@/api/userApi";

const DashboardHome = () => {
  const userId = localStorage.getItem("userId");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // Store all users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks assigned to the logged-in user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskData, userData] = await Promise.all([
          getUserTasks(userId),
          getAllUsers()
        ]);

        setTasks(taskData);
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error loading tasks.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    } else {
      setError("User ID not found.");
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.taskId}
            task={task}
            users={users}
            setTasks={setTasks}
            showAssignUser={false}
          />
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default DashboardHome;
