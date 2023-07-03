import React, { createContext } from 'react'
import api from '../../api'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {


    const signup = async (data) => {
        try {
            console.log(data)
            const response = await api.post("/users/register", data);
            // Handle the response here, such as updating state or displaying a message
            localStorage.setItem("it_wale_token",response.data.token)
        } catch (error) {
            // Handle any errors that occurred during the API call
            console.error(error);
        }

    }

    const login = async (data) => {
        try {
            const response = await api.post("/users/login", data);
            // Handle the response here, such as updating state or displaying a message
            console.log(response.data);
        } catch (error) {
            // Handle any errors that occurred during the API call
            console.error(error);
        }
    }
    return (
        <AuthContext.Provider value={{ signup, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
