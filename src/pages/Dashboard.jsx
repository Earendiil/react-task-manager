import React from "react";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">TaskManager</div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Welcome, User</span>
          <button className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-md">Logout</button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r">
          <ul className="space-y-3">
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200 font-medium">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200 font-medium">Tasks</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200 font-medium">Categories</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-gray-200 font-medium">Users</a>
            </li>
          </ul>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Tasks Today</h3>
              <ul>
                <li>☐ Task 1</li>
                <li>☑ Task 2</li>
              </ul>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Upcoming</h3>
              <ul>
                <li>☐ Task 3</li>
                <li>☑ Task 4</li>
              </ul>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Completed</h3>
              <ul>
                <li>☑ Task 5</li>
                <li>☑ Task 6</li>
              </ul>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Quick Add Task
          </button>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
