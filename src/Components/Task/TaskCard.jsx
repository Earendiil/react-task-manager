// TaskCard.jsx
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa"; // Import icons

const TaskCard = ({ task }) => {
  const { taskName, title, description, dueDate, completed, categoryId, assignedUsers } = task;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{taskName}</h3>
      <p className="text-lg font-bold text-gray-800">{title}</p>
      <p className="text-gray-600">{description}</p>
      
      <div className="mt-2">
        <p><strong>Due Date:</strong> {new Date(dueDate).toLocaleString()}</p>
        <p><strong>Category ID:</strong> {categoryId}</p>
        <div className="assigned-users mt-2">
        <h4 className="text-lg font-medium">Assigned Users:</h4>
        <ul>
          {assignedUsers.length > 0 ? (
            assignedUsers.map((user, index) => (
              <li key={index}>{user.username}</li>  
            ))
          ) : (
            <li>No users assigned</li>
          )}
        </ul>
      </div>
      </div>

      {/* Status at the bottom with icons */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm">
          <strong>Status: </strong>
          {completed ? (
            <span className="text-green-500 flex items-center">
              <FaCheckCircle className="mr-1" /> Completed
            </span>
          ) : (
            <span className="text-yellow-500 flex items-center">
              <FaHourglassHalf className="mr-1" /> Pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
