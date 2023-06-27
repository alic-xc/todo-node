import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Registration, Login } from "../pages";
import ProtectedRoute from "../components/Auth";

const BookrRouter = () => {
  /*
   * This component handle routes that is used within this app.
   */
  return (
    <HashRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default BookrRouter;
