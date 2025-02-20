import React from 'react'
import { Navigate } from 'react-router-dom';
const ProtectedAuth = (props) => {
    if (localStorage.getItem("UserToken") === null) return props.children;
    else return <Navigate to={"/"} />
}
export default ProtectedAuth;