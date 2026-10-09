import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import Posts from "@/pages/Posts";
import Todos from "@/pages/Todos";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/products", element: <Products /> },
          { path: "/cart", element: <Cart /> },
          { path: "/posts", element: <Posts /> },
          { path: "/todos", element: <Todos /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);