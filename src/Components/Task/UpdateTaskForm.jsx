import { useState, useEffect } from "react";
import { updateTask } from "@/api/taskApi"; 

const UpdateTaskForm = ({ task, onCancel, onTaskUpdated, allUsers }) => {
  const [taskData, setTaskData] = useState({
    taskId: "",
    taskName: "",
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    categoryId: 1,
  });
  const [errors, setErrors] = useState({});

  // Prefill the form with the task data whenever the task prop changes
  useEffect(() => {
    if (task) {
      setTaskData({
        taskId: task.taskId || "",
        taskName: task.taskName || "", // Read-only field
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        completed: task.completed || false,
        categoryId: task.categoryId || 1, // Read-only field
      });
    }
  }, [task]); // Only run when `task` prop changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const dueDate = new Date(taskData.dueDate);
    const now = new Date();

    if (!taskData.title?.trim()) newErrors.title = "Title is required.";
    if (!taskData.description?.trim()) newErrors.description = "Description is required.";
    if (isNaN(dueDate.getTime())) {
      newErrors.dueDate = "Invalid date.";
    } else if (dueDate <= now) {
      newErrors.dueDate = "Due date must be in the future.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const updated = await updateTask(task.taskId, taskData);
      onTaskUpdated(updated);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <div className="task-form bg-yellow-50 shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
      <form onSubmit={handleSubmit}>
        {/* Task Name (Read-only) */}
        <div className="mb-4">
          <label className="block font-medium">Task Name</label>
          <input
            type="text"
            name="taskName"
            value={taskData.taskName}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-200"
          />
        </div>

        {/* Title (Editable) */}
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description (Editable) */}
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Due Date (Editable) */}
        <div className="mb-4">
            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate || ""} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
        </div>

        {/* Completed (Editable checkbox) */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={taskData.completed}
              onChange={(e) =>
                setTaskData({ ...taskData, completed: e.target.checked })
              }
              className="mr-2"
            />
            <span>Completed</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
