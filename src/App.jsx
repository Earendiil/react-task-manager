import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import UsersPage from "./pages/UsersPage";
import TasksPage from "./pages/TasksPage";
import CategoriesPage from "./pages/CategoriesPage";
import UserDetailPage from "./components/User/UserDetailPage";
import CategoryDetailPage from "./components/Category/CategoryDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryDetailPage />} />

      </Route>
    </Routes>
  );
}

export default App;
