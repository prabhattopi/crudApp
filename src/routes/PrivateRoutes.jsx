import React, { FC } from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';


const PrivateRoutes = ({children}) => {
    const {user}=useAuth()
    if(!user){
        return <Navigate to="/login" replace={true}/>;
    }

    return children;
}

export default PrivateRoutes