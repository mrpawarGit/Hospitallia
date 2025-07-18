import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../contexts/auth/SignIn";
import SignUp from "../contexts/auth/SignUp";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
