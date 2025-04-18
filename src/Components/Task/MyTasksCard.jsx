import { useState, useEffect } from "react";
import { FaCheckCircle, FaHourglassHalf, FaEdit, FaRegCheckCircle } from "react-icons/fa";
import UpdateTaskForm from "./UpdateTaskForm";
import { getAllCategories } from "@/api/categoryApi";

const MyTasksCard = ({ task, setTasks }) => {
  const { taskId, taskName, title, description, dueDate, completed, assignedUsers = [], categoryId } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories for the task card (optional, if needed)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Function to handle task update after edit
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === updatedTask.taskId ? updatedTask : t))
    );
    setIsEditing(false);
  };

  // Ensure the taskId is not null for the key, fallback to a unique combination of properties
  const key = taskId ? taskId : `${taskName}-${title}-${Math.random()}`;

  return (
    <div className="rounded-lg shadow-md p-4 mb-4 relative bg-slate-200">
      <h3 className="text-xl font-semibold mb-2">{taskName}</h3>
      <p className="text-lg font-bold text-gray-800">{title}</p> {/* Title displayed */}
      <p className="text-gray-600 mb-4">{description}</p> {/* Description displayed */}
      
      <div className="mt-2">
        <p><strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}</p>
        <div className="assigned-users mt-2">
          <h4 className="text-lg font-medium">Assigned Users:</h4>
          <ul>
            {assignedUsers && assignedUsers.length > 0 ? (
              assignedUsers.map((user) => <li key={user.id}>{user.username}</li>)
            ) : (
              <li>No users assigned</li>
            )}
          </ul>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm">
          <strong>Status: </strong>
          {completed ? (
            <span className="text-green-500">Completed</span>
          ) : (
            <span className="text-yellow-500">Pending</span>
          )}
        </div>
      </div>
    </div>
  );
};


export default MyTasksCard;
