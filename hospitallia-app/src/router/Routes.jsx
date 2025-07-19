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

// Patient management imports
import PatientList from "../pages/patients/PatientList";
import AddPatient from "../pages/patients/AddPatient";
import EditPatient from "../pages/patients/EditPatient";

// Appointment management imports
import AppointmentList from "../pages/appointments/AppointmentList";
import AddAppointment from "../pages/appointments/AddAppointment";
import EditAppointment from "../pages/appointments/EditAppointment";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Patient Management: Protected CRUD routes */}
      <Route
        path="/patients"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <PatientList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/add"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <AddPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <EditPatient />
          </ProtectedRoute>
        }
      />

      {/* Appointment Management: Protected CRUD routes */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff", "doctor"]}>
            <AppointmentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/add"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <AddAppointment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <EditAppointment />
          </ProtectedRoute>
        }
      />

      {/* Role-based dashboards */}
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

      {/* 404 fallback at very end */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
