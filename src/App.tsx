import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import { ReactNode } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// import api from "./http/api";

// import { useEffect } from "react";
// import { apiUrlLogin } from "./http/apiUrl";
// import React from "react";

export default function App() {
  // const Login =async () => {
  //   const res = await api.post(apiUrlLogin, {
  //     email: "user@example.com",
  //     password: "asdfghjkl"
  //   })

  //   console.log(res)
  // }

  // useEffect(() => {
  //   Login()
  // }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
