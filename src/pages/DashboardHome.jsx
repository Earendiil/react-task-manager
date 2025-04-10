
const DashboardHome = () => {
    return (
      <div>
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
      </div>
    );
  };
  
  export default DashboardHome;
  