import React, { useState } from "react";
import { useGetMyAccountQuery } from "../services/bookrAPI";
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    data: userInfo,
    isError,
    isLoading,
    refetch,
  } = useGetMyAccountQuery();
  React.useEffect(() => {
    if (!isLoading && !isError) {
      setUser(userInfo);
      setIsAuthenticated(true);
      setLoading(false);
    }

    if (isLoading) {
      setLoading(true);
    }

    if (!isLoading && isError) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [userInfo, isError]);

  const logout = () => {
    if (user && isAuthenticated) {
      localStorage.removeItem("access");
      sessionStorage.clear();
      setUser({});
      window.location.reload();
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, loading, logout, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
