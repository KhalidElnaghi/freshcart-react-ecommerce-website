import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import Contact from "./Components/Contact/Contact";
import { useContext, useEffect } from "react";
import { UserTokenContext } from "./Context/UserTokenContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LogingProtectedRoute from "./Components/logingProtectedRoute/logingProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Profile/Profile";

let router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        ),
      },

      {
        path: "login",
        element: (
          <LogingProtectedRoute>
            <Login />
          </LogingProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <LogingProtectedRoute>
            <Register />
          </LogingProtectedRoute>
        ),
      },

      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },{
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  let { setUserToken } = useContext(UserTokenContext);

  useEffect(() => {
    if (localStorage.getItem("freshcartUserToken"))
      setUserToken(localStorage.getItem("freshcartUserToken"));
  }, []);
  return (
    <CartContextProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </CartContextProvider>
  );
}
export default App;
