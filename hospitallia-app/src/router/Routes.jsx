import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/AdminDashboard";
import DoctorDashboard from "../pages/DoctorDashboard";
import PatientDashboard from "../pages/PatientDashboard";
import StaffDashboard from "../pages/StaffDashboard";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import SignUp from "../contexts/auth/SignUp";
import SignIn from "../contexts/auth/SignIn";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
// Add any other pages

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected routes with role check */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={["staff"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Example: public/fallback route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
