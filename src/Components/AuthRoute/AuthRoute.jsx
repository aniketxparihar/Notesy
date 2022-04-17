import React from 'react'
import { useAuth } from '../../Context/Auth-Context'
import { Outlet,Navigate } from 'react-router-dom';
const AuthRoute = () => {
    const { authToken } = useAuth();
  return (
      authToken!==""?<Navigate to="/" replace={true}/>:<Outlet/>
  )
}

export default AuthRoute