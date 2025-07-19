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

// Medical Records management imports
import MedicalRecordList from "../pages/medicalRecords/MedicalRecordList";
import AddMedicalRecord from "../pages/medicalRecords/AddMedicalRecord";
import EditMedicalRecord from "../pages/medicalRecords/EditMedicalRecord";
import MedicalRecordDetails from "../pages/medicalRecords/MedicalRecordDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Patient Management */}
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

      {/* Appointment Management */}
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

      {/* Medical Records Management */}
      <Route
        path="/medical-records"
        element={
          <ProtectedRoute
            allowedRoles={["admin", "staff", "doctor", "patient"]}
          >
            <MedicalRecordList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medical-records/add"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <AddMedicalRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medical-records/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <EditMedicalRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medical-records/:id"
        element={
          <ProtectedRoute
            allowedRoles={["admin", "staff", "doctor", "patient"]}
          >
            <MedicalRecordDetails />
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

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
