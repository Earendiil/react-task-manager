import { useState, useEffect } from "react";
import TaskCard from "@/components/Task/TaskCard"; 
import { getUserTasks, getAllUsers } from "@/api/userApi";

const DashboardHome = () => {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // Store all users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);
  

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
  }
}, [userId]);


  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl"> My Tasks</h1>
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
