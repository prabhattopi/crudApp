
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import React, { FC } from "react"


const PublicRoutes = ({children}) => {
    const {user}=useAuth()
    if(user){
        return <Navigate to="/" replace={true}/>;
    }

    return children;
 
}

export default PublicRoutes