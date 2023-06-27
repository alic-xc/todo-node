import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import OverlayCustomLoader from "./OverlayCustomLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(UserContext);
  const navigate = useNavigate();

  if (!isAuthenticated && !loading) {
    navigate("/login?error=unauthenticated");
  }

  if (loading) {
    return <OverlayCustomLoader></OverlayCustomLoader>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
