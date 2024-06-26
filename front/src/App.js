import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import Contacts from "./components/contacts";
import AddContact from "./components/addContact";
import EditContact from "./components/EditContact";
import Logout from "./components/logout";
import ProtectedRoutes from "./components/protectedRoutes";
import NotFound from "./pages/notFound";

export const UserContext = createContext(null);

axios.defaults.baseURL = "http://localhost:3001/contactMS/";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Contacts /> },
      { path: "/dashboard/add-contact", element: <AddContact /> },
      { path: "/dashboard/edit-contact/:id", element: <EditContact /> },
    ],
  },
  { path: "/logout", element: <Logout /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("verify", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
