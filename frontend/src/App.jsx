import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ApplicationDetails from "./pages/ApplicationDetails";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Application";
import NotFound from "./pages/NotFound";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/resume" element={<Resume />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
