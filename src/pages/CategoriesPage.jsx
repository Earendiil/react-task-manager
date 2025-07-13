import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory, getAllCategories } from "@/api/categoryApi";
import { useAuth } from "@/hooks/useAuth";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAdmin } = useAuth()

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleViewCategory = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
  
    try {
      await addCategory({ name: newCategoryName });
      setNewCategoryName("");
      setIsFormVisible(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error); // Fix: use `error`, not `err`
    }
  };

  

  
 return (
  <div className="categories-container bg-yellow-800 min-h-screen p-6">
    <h2 className="text-3xl font-bold mb-8 text-gray-800">Categories</h2>
    <div className="mb-6">
      {isAdmin && (
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors mb-4"
        >
          {isFormVisible ? "Cancel" : "Create Category"}
        </button>
      )}

      {isFormVisible && (
        <form onSubmit={handleCreateCategory} className="flex items-center gap-4 mb-8">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            className="flex-grow border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </form>
      )}
    </div>

    <div className="category-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {loading ? (
        <p className="text-gray-600 text-center col-span-full">Loading categories...</p>
      ) : (
        categories.map((category) => (
          <div
            key={category.categoryId}
            className="category-card bg-green-100 shadow-lg rounded-xl p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{category.name}</h3>
            <p className="text-gray-700 mb-6">Tasks: {category.tasks.length}</p>
            <button
              onClick={() => handleViewCategory(category.categoryId)}
              className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Category
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

};

export default CategoriesPage;
