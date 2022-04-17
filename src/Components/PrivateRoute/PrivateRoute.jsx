import React from 'react'
import { useAuth } from '../../Context/Auth-Context'
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
     const { authToken } = useAuth();
    return (
      authToken!==""?<Outlet/>:<Navigate to="/login" />
  )
}

export default PrivateRoute