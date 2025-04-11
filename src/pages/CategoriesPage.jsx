import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/api/categoryApi";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Start in loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories(); // Call your API
        setCategories(data); // Set data
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false); // Turn off loading spinner
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
      <div className="category-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((category) => (
            <div key={category.categoryId} className="category-card bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.tasks.length} Task{category.tasks.length !== 1 ? "s" : ""}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => console.log(`View category ${category.categoryId}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Category
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
