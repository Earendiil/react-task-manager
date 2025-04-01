import CreateUserForm from "./Components/User/CreateUser";
import EditUserForm from "./Components/User/EditUser";
import UserList from "./Components/UserList";




function App() {
  return (
    <div>
      <h1>My App</h1>
      <div>
         <ul>
            <UserList />
         </ul>
      </div>
     

    </div>
  );
}


export default App;
