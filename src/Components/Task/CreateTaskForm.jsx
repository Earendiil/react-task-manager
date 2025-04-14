import { useState } from "react";
import { createTask } from "@/api/taskApi";

const CreateTaskForm = ({ categoryId, onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    taskName: "",
    title: "",
    description: "",
    dueDate: "",
    categoryId: categoryId,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const pattern = /.*[a-zA-Z].*/;
    const nameLength = taskData.taskName.trim().length;
    const dueDate = new Date(taskData.dueDate);
    const now = new Date();

    if (!pattern.test(taskData.taskName)) {
      newErrors.taskName = "Task name must contain at least one letter.";
    } else if (nameLength < 3 || nameLength > 20) {
      newErrors.taskName = "Task name must be between 3 and 20 characters.";
    }

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
      await createTask(taskData);
      onTaskCreated(); // Notify parent
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="task-form bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Task Name</label>
          <input
            type="text"
            name="taskName"
            value={taskData.taskName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName}</p>}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
