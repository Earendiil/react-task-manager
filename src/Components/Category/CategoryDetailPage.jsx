import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById } from "@/api/categoryApi";
import { getAllTasks, createTask } from "@/api/taskApi"; 

const CategoryDetailPage = () => {
  const { id } = useParams(); // Category ID from URL
  const navigate = useNavigate(); // For navigation
  const [category, setCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State for toggling form visibility
  const [taskData, setTaskData] = useState({
    taskName: "",
    title: "",
    description: "",
    dueDate: "",
    categoryId: id,
  });

  // Fetch category details and tasks when the page loads
  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryData = await getCategoryById(id); // Fetch category details
      setCategory(categoryData);

      // Fetch tasks for the selected category directly
      const tasksData = await getAllTasks(); // Assuming this returns all tasks
      const filteredTasks = tasksData.filter((task) => task.categoryId === Number(id));
      setTasks(filteredTasks); // Filter tasks by categoryId
    };

    fetchCategoryData();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(taskData); // Create the task
      setIsFormVisible(false); // Hide the form after task is created
      setTaskData({
        taskName: "",
        title: "",
        description: "",
        dueDate: "",
        categoryId: id,
      });

      // Re-fetch the category to show the newly added task
      const categoryData = await getCategoryById(id);
      setCategory(categoryData);

      // Update the tasks for the current category
      const tasksData = await getAllTasks();
      const filteredTasks = tasksData.filter((task) => task.categoryId === Number(id));
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleBackClick = () => {
    navigate("/categories");  // Navigate back to the categories page
  };

  // Function to format date as "MM/DD/YYYY"
  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`; // Format: MM/DD/YYYY
  };

  return (
    <div className="category-detail-container">
      <button
        onClick={handleBackClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        Back to Categories
      </button>
      {category && (
        <>
          <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
          <p className="text-lg mb-6">Total tasks: {tasks.length}</p>

          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-6"
          >
            {isFormVisible ? "Cancel" : "Create Task"}
          </button>

          {/* Display task creation form when isFormVisible is true */}
          {isFormVisible && (
            <div className="task-form bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
              <form onSubmit={handleCreateTask}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Task Name</label>
                  <input
                    type="text"
                    name="taskName"
                    value={taskData.taskName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Task
                </button>
              </form>
            </div>
          )}

          <div className="tasks-list">
            <h3 className="text-xl font-semibold mb-4">Tasks</h3>
            <ul>
              {tasks.length === 0 ? (
                <li>No tasks available for this category.</li>
              ) : (
                tasks.map((task) => (
                  <li key={task.taskId} className="task-item mb-4">
                    <h4 className="font-semibold">{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Due Date: {formatDate(task.dueDate)}</p> {/* Format the due date */}
                    <p>Status: {task.completed ? "Completed" : "Pending"}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDetailPage;
