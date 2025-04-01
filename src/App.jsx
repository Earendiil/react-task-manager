import CreateUserForm from "./Components/User/CreateUser";
import EditUserForm from "./Components/User/EditUser";
import UserList from "./Components/UserList";




function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold mt-4">Task Manager</h1>
      <div className="w-full">
        <ul>
          <UserList />
        </ul>
      </div>
    </div>
  );
  
}
export default App;
