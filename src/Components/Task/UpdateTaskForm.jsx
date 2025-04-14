import { useState, useEffect } from "react";
import { updateTask } from "@/api/taskApi"; 

const UpdateTaskForm = ({ task, onCancel, onTaskUpdated, allUsers }) => {
  const [taskData, setTaskData] = useState({ ...task });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTaskData({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const dueDate = new Date(taskData.dueDate);
    const now = new Date();


    if (!taskData.title.trim()) newErrors.title = "Title is required.";
    if (!taskData.description.trim()) newErrors.description = "Description is required.";
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
        <div className="mb-4">
          <label className="block font-medium">Task Name</label>
          <input
            type="text"
            name="taskName"
            value={taskData.taskName}
            readOnly
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName}</p>}
        </div>

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

        <div className="mb-4">
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate.split("T")[0]} // trimming to YYYY-MM-DD
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
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
