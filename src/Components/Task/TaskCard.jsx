import { useState, useEffect } from "react";
import { FaCheckCircle, FaHourglassHalf, FaEdit } from "react-icons/fa";
import { assignTask } from "@/api/taskApi";
import { getAllCategories } from "@/api/categoryApi";
import UpdateTaskForm from "./UpdateTaskForm";


const TaskCard = ({ task, users, setTasks }) => {
  const { taskId, taskName, title, description, dueDate, completed, assignedUsers, categoryId } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allUsers, setAllUsers] = useState ([]);

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

 
    useEffect(() => {
      const fetchUsers = async () => {
        const usersData = await getAllUsers();
        setAllUsers(usersData);
      };
      fetchUsers();
    }, []);


    const handleAssignUser = async (userId) => {
      if (!userId) return; // Handle case where no user is selected
    
      // Check if the user is already assigned
      const isUserAlreadyAssigned = assignedUsers.some((user) => user.id === userId);
    
      if (isUserAlreadyAssigned) {
        alert("This user is already assigned to the task.");
        return; // Exit the function if the user is already assigned
      }
    
      try {
        // Assign the user
        await assignTask(taskId, userId);
        alert("User assigned successfully!");
    
        // Update the task's assigned users list
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.taskId === taskId
              ? {
                  ...t,
                  assignedUsers: [
                    ...t.assignedUsers,
                    { id: userId, username: users.find((u) => u.id === userId)?.username },
                  ],
                }
              : t
          )
        );
      } catch (err) {
        console.error("Error assigning user:", err);
        alert("Failed to assign user.");
      }
    };
    
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === updatedTask.taskId ? updatedTask : t))
    );
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
      )}

      {isEditing ? (
        <UpdateTaskForm
          task={task}
          allUsers={users}
          onCancel={() => setIsEditing(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">{taskName}</h3>
          <p className="text-lg font-bold text-gray-800">{title}</p>
          <p className="text-gray-600">{description}</p>

          <div className="mt-2">
            <p><strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}</p>
            <div className="assigned-users mt-2">
              <h4 className="text-lg font-medium">Assigned Users:</h4>
              <ul>
                {assignedUsers.length > 0 ? (
                  assignedUsers.map((user) => (
                    <li key={user.id}>{user.username}</li>
                  ))
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
                <span className="text-green-500 flex items-center">
                  <FaCheckCircle className="mr-1" /> Completed
                </span>
              ) : (
                <span className="text-yellow-500 flex items-center">
                  <FaHourglassHalf className="mr-1" /> Pending
                </span>
              )}
            </div>
          </div>

          {/* Assign Users */}
          <div className="mt-4">
            <h4 className="text-lg font-medium">Assign User</h4>
            {users && users.length > 0 ? (
              <select
                  onChange={(e) => handleAssignUser(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.username}
                    </option>
                  ))}
            </select>
            
            ) : (
              <p>No users available to assign.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
