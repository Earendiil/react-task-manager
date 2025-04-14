import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllTasks } from "@/api/taskApi";
import TaskCard from "@/components/Task/TaskCard";
import { getAllUsers } from "@/api/userApi";

const TaskPage = () => {
  const { userId } = useParams(); // Assuming you get the userId from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        const taskData = await getAllTasks(userId);
        setTasks(taskData);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load tasks");
        setLoading(false);
        return;
      }
    
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
        setLoading(false);
      }
    
      setLoading(false);
    };
    
    fetchTasksAndUsers();
  }, [userId]);
  

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-blue-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Tasks  {userId}</h2>

      {/* Display tasks */}
      {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.taskId}
              task={task}
              users={users}
              setTasks={setTasks}
    />
  ))
) : (
  <p>No tasks assigned.</p>
)}

    </div>
  );
};

export default TaskPage;
