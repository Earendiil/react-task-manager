import { deleteUser } from "../../api/userApi";


const UserDeleteButton = ({ userId, setUsers }) => {
  const handleDelete = async () => {
    try {
      await deleteUser(userId); 
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId)); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default UserDeleteButton;
