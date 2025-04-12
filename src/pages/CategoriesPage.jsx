import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory, getAllCategories } from "@/api/categoryApi";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="categories-container bg-amber-300">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
      <div>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
      >
        {isFormVisible ? "Cancel" : "Create Category"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleCreateCategory} className="mb-6">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            className="border px-4 py-2 rounded-md mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      )}

      



      </div>

      <div className="category-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <div key={category.categoryId} className="category-card bg-green-200 shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600">Tasks: {category.tasks.length}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleViewCategory(category.categoryId)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Category
                </button>
                {/* Add Edit/Delete functionality here if needed */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
