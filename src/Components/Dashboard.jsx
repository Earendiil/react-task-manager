
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {

  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">TaskManager</div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Welcome, {user.username || "User"} </span>
          <button onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-md">Logout</button>
        </div>
      </nav>
     
      {/* Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-300 p-4 border-r overflow-y-auto">
          <ul className="space-y-3">
            <li><Link to="/dashboard" className="hover:bg-gray-200 block px-3 py-2 rounded">Dashboard</Link></li>
            <li><Link to="/users" className="hover:bg-gray-200 block px-3 py-2 rounded">Users</Link></li>
            <li><Link to="/tasks" className="hover:bg-gray-200 block px-3 py-2 rounded">Tasks</Link></li>
            <li><Link to="/categories" className="hover:bg-gray-200 block px-3 py-2 rounded">Categories</Link></li>
          </ul>
        </aside>

        {/* Dynamic content */}
        <main className="flex-1 p-6 bg-gray-400 overflow-y-auto">   
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
