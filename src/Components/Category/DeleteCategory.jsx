import { deleteCategory } from "@/api/categoryApi";

const DeleteCategory = ({ categoryId, onDeleteSuccess }) => {
    const handleDelete = async () => {
      try {
        await deleteCategory(categoryId); 
        onDeleteSuccess(); // callback to navigate
      } catch (err) {
        console.error("Failed to delete category", err);
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Delete Category
      </button>
    );
  };
  
  export default DeleteCategory;