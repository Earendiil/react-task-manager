import { useState, useEffect } from "react";
import { FaCheckCircle, FaHourglassHalf, FaEdit } from "react-icons/fa";
import { assignTask } from "@/api/taskApi";
import { updateTask } from "@/api/taskApi";
import { getAllCategories } from "@/api/categoryApi"; // Import the API to get categories

const TaskCard = ({ task, users, setTasks }) => {
  const { taskId, taskName, title, description, dueDate, completed, assignedUsers, categoryId } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState({
    taskName,
    title,
    description,
    dueDate,
    completed,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for the dropdown menu
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

  const handleAssignUser = async (userId) => {
    try {
      await assignTask(taskId, userId);
      alert("User assigned successfully!");

      // Update the assignedUsers in the task state
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.taskId === taskId
            ? { ...t, assignedUsers: [...t.assignedUsers, { id: userId, username: users.find((u) => u.id === userId).username }] }
            : t
        )
      );
    } catch (err) {
      console.error("Error assigning user:", err);
      alert("Failed to assign user.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      // Only include fields that were changed
      const updatedFields = {};

      // Add taskName if it was changed or is required (taskName is always required)
      updatedFields.taskName = updatedTaskData.taskName;

      // Add other fields if they are changed
      if (updatedTaskData.title !== title) updatedFields.title = updatedTaskData.title;
      if (updatedTaskData.description !== description) updatedFields.description = updatedTaskData.description;
      if (updatedTaskData.dueDate !== dueDate) updatedFields.dueDate = updatedTaskData.dueDate;
      if (updatedTaskData.completed !== completed) updatedFields.completed = updatedTaskData.completed;

      // Call the updateTask API with the updated fields (without changing categoryId)
      await updateTask(taskId, updatedFields);

      alert("Task updated successfully!");
      setIsEditing(false); // Hide the edit form after saving
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
      {/* Move Edit Button to the top right */}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        <FaEdit className="mr-2" /> Edit
      </button>

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

      {isEditing && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Edit Task</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Task Name</label>
              <input
                type="text"
                name="taskName"
                value={updatedTaskData.taskName}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={updatedTaskData.title}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={updatedTaskData.description}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={updatedTaskData.dueDate}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              onClick={handleSaveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

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
            onChange={(e) => handleAssignUser(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        ) : (
          <p>No users available to assign.</p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
