import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "@/api/categoryApi";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleViewCategory = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <div className="categories-container bg-amber-300">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
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
