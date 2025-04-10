import React, { useEffect, useState } from "react";

// Mock Data for Categories (replace this with your actual API call later)
const mockCategories = [
  { categoryId: 1, categoryName: "Development" },
  { categoryId: 2, categoryName: "Design" },
  { categoryId: 3, categoryName: "Marketing" },
  { categoryId: 4, categoryName: "Finance" },
  // Add more categories here
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState(mockCategories); // Use mock data initially
  const [loading, setLoading] = useState(false);  // Set to false because we’re using mock data

  useEffect(() => {
    // Simulate fetching data (in future, you can replace this with your actual fetch call)
    setLoading(false);  // Set loading to false once mock data is set
  }, []);

  return (
    <div className="categories-container">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
      <div className="category-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading categories...</p> // Show a loading text until you switch to the real data
        ) : (
          categories.map((category) => (
            <div key={category.categoryId} className="category-card bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{category.categoryName}</h3>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => console.log(`View category ${category.categoryId}`)} // Add your category details navigation
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Category
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

export default CategoriesPage;
