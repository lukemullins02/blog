import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Login";
import Posts from "../components/Posts";
import ExpandPost from "../components/ExpandPost";
import Register from "../components/Register";
import Logout from "../components/Logout";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Posts />,
        },
        {
          path: "/posts/:id",
          element: <ExpandPost />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "*",
          element: <h1>Invalid Route</h1>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
