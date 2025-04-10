import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllTasks } from "@/api/taskApi";
import TaskCard from "@/components/Task/TaskCard";

const TaskPage = () => {
  const { userId } = useParams(); // Assuming you get the userId from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await getAllTasks(userId);  // Get tasks for the user
        setTasks(taskData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-blue-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Tasks for User {userId}</h2>

      {/* Display tasks */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.taskId}
            task={task}
            assignedUsers={task.assignedUsers}  // Pass assigned users to TaskCard
          />
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default TaskPage;
