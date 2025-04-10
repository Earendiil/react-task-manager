import React, { useEffect, useState } from "react";

// Mock Data (replace this with your actual API call later)
const mockTasks = [
  {
    taskId: 1,
    taskName: "Task 1",
    title: "Finish UI Design",
    description: "Complete the initial design for the task manager",
    dueDate: "2025-04-15",
    completed: false,
    categoryId: 2,
    assignedUsers: [
      { id: 1, username: "User1" },
      { id: 2, username: "User2" },
    ],
  },
  {
    taskId: 2,
    taskName: "Task 2",
    title: "Backend Setup",
    description: "Set up the server and database",
    dueDate: "2025-04-20",
    completed: true,
    categoryId: 1,
    assignedUsers: [
      { id: 3, username: "User3" },
    ],
  },
  // Add more tasks here
];

const TasksPage = () => {
  const [tasks, setTasks] = useState(mockTasks); // Use mock data initially
  const [loading, setLoading] = useState(false);  // Set to false because we’re using mock data

  useEffect(() => {
    // Simulate fetching data (in future, you can replace this with your actual fetch call)
    setLoading(false);  // Set loading to false once mock data is set
  }, []);

  return (
    <div className="tasks-container">
      <h2 className="text-2xl font-semibold mb-6">Tasks</h2>
      <div className="task-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading tasks...</p> // Show a loading text until you switch to the real data
        ) : (
          tasks.map((task) => (
            <div key={task.taskId} className="task-card bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Task Name:</strong> {task.taskName}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Description:</strong> {task.description}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Assigned Users:</strong>{" "}
                {task.assignedUsers.map((user, index) => (
                  <span key={user.id} className="text-blue-500">
                    {user.username}
                    {index < task.assignedUsers.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => console.log(`View task ${task.taskId}`)} // Add your task details navigation
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Task
                </button>
                {/* Add Edit/Delete functionality here */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
