import React from 'react'
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = (props) => {
    if(localStorage.getItem("UserToken") !== null) return props.children;
    else return <Navigate to={"/login"} />
}
export default ProtectedRoutes;