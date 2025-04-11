import React, { useState } from "react";
import { createTask } from "@/api/taskApi"; // The function to create a task
import { useNavigate } from "react-router-dom";

const CreateTaskForm = ({ categoryId }) => {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    taskName: "",
    title: "",
    dueDate: "",
    description: "",
    completed: false,
    categoryId: categoryId, // categoryId is passed as a prop
  });

  // Handle input changes for task creation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // Handle form submission for task creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(taskData); // Call the API to create a task
      console.log("Task created:", newTask);
      // Optionally navigate to another page or update the UI
      navigate(`/categories/${categoryId}`); // Navigate back to the category detail page after task creation
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-lg p-6">
      <div>
        <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={taskData.taskName}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskData.title}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="completed" className="mr-2 text-sm font-medium text-gray-700">
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={taskData.completed}
          onChange={() => setTaskData({ ...taskData, completed: !taskData.completed })}
          className="h-4 w-4 border-gray-300 rounded focus:ring-indigo-500 text-indigo-600"
        />
      </div>
      <div>
        <button
          type="submit"
          className="mt-4 inline-block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
