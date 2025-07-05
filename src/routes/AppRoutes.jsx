

import CategoriesPage from "@/pages/CategoriesPage";
import DashboardHome from "@/pages/DashboardHome";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignUpPage";
import UsersPage from "@/pages/UsersPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/Dashboard";
import TaskPage from "@/pages/TasksPage";
import CategoryDetailPage from "@/components/Category/CategoryDetailPage";
import UserDetailPage from "@/components/User/UserDetailPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
        <Route path="tasks" element={<TaskPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
