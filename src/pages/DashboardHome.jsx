import { useState, useEffect } from "react";
import MyTasksCard from "@/components/Task/MyTasksCard";
import { getUserTasks } from "@/api/userApi";

const DashboardHome = () => {
  const userId = localStorage.getItem("userId");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getUserTasks(userId); // Fetch tasks for the user
        setTasks(tasksData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchTasks();
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
        tasks.map((task) => {
          // Ensure unique key for each task
          const taskKey = task.taskId || `${task.taskName}-${task.title}-${Math.random()}`;
          return <MyTasksCard key={taskKey} task={task} setTasks={setTasks} />;
        })
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default DashboardHome;
