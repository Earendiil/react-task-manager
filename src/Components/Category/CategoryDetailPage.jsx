import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoryById } from "@/api/categoryApi";
import { getAllTasks } from "@/api/taskApi"; 
import CreateTaskForm from "../Task/CreateTaskForm";

const CategoryDetailPage = () => {
  const { id } = useParams(); // Category ID from URL
  const navigate = useNavigate(); // For navigation
  const [category, setCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State for toggling form visibility
 

  
  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryData = await getCategoryById(id); 
      setCategory(categoryData);

      
      const tasksData = await getAllTasks(); 
      const filteredTasks = tasksData.filter((task) => task.categoryId === Number(id));
      setTasks(filteredTasks); 
    }

    fetchCategoryData();
  }, [id]);

   // Navigate back to the categories page
  const handleBackClick = () => {
    navigate("/categories"); 
  };

  // Function to format date as "MM/DD/YYYY"
  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`; 
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
  <CreateTaskForm
    categoryId={id}
    onTaskCreated={async () => {
      setIsFormVisible(false);

      const categoryData = await getCategoryById(id);
      setCategory(categoryData);

      const tasksData = await getAllTasks();
      const filteredTasks = tasksData.filter((task) => task.categoryId === Number(id));
      setTasks(filteredTasks);
    }}
  />
)}


          <div className="tasks-list">
            <h3 className="text-xl font-semibold mb-4">Tasks</h3>
            <ul>
              {tasks.length === 0 ? (
                <li>No tasks available for this category.</li>
              ) : (
                tasks.map((task) => (
                  <li key={task.taskId} className="task-item mb-4">
                    <h3 className="font-bold">{task.taskName}</h3>
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
