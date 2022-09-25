import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Headers from "./Components/Header/header";
import UserList from "./Components/UserList";
import Navbar from "./Components/Header/navbar";
import User from "./Components/AddUser";
import UpdateUser from "./Components/updateUser";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: [<Navbar/>, <Headers />, <h1>Tao là footer</h1>],
    },
    {
      path: "/clients",
      element: [<Navbar/>,<UserList />],
    },{
      path: "/createUser",
      element: [<Navbar/>,<User />],
    },
    {
      path:"/updateUser/:id",
      
      element:[<Navbar/>,<UpdateUser />]
    }
  ]);

  return (
    <div className="container">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
