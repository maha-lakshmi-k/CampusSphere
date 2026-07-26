import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Notices from "./pages/Notices";
import Assignments from "./pages/Assignments";
import Submissions from "./pages/Submissions";
import Profile from "./pages/Profile";
import DeleteAccount from "./pages/DeleteAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notices"
        element={<Notices />}
      />
      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assignments"
        element={<Assignments />}
      />
      <Route
        path="/submissions"
        element={<Submissions />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/delete-account"
        element={<DeleteAccount />}
      />
    </Routes>
  );
}

export default App;