import React from "react";
import { Navigate } from "react-router-dom";

export default function LogingProtectedRoute({ children }) {
  if (localStorage.getItem("freshcartUserToken") == null) {
    return children;
  } else {
    return <Navigate to={"/home"} />;
  }
}
