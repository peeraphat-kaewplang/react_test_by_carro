import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

type TProtectedRoute = {
    children : ReactNode
  }

const ProtectedRoute = ({children}: TProtectedRoute) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>
}

export default ProtectedRoute