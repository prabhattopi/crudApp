import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api'
import { toast } from 'react-toastify';
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('it_wale_token'))
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchData = async () => {
      try {
        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
          },
        });

        if (isMounted) {
          // Only update state if the component is still mounted
          toast.success(response.data.message || 'You are logged in', {
            position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
            autoClose: 500, // Auto-close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar: true, // Hide the progress bar
          });
          setUser(response.data.user);
          setIsLoading(false);
        }
      } catch (err) {
        // Handle errors and set the user to null
        if (isMounted) {
          // Only update state if the component is still mounted
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, []);



  const signup = async (data) => {
    try {

      const response = await api.post("/users/register", data);
      // Handle the response here, such as updating state or displaying a message
      toast.success(response.data.message || 'Login in successfully', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
      navigate("/login")
    } catch (error) {
      // Handle any errors that occurred during the API call
      toast.error(error.response.data.message || 'Worng credential', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
    }

  }

  const login = async (data) => {
    try {
      const response = await api.post("/users/login", data);
      localStorage.setItem("it_wale_token", response.data.token)
      setToken(localStorage.getItem('it_wale_token'))


      toast.success(response.data.message || 'Login in successfully', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
      setUser(response.data.user)
      // Handle the response here, such as updating state or displaying a messag
      // navigate("/")
    } catch (error) {
      // Handle any errors that occurred during the API call

      toast.error(error.response.data.message || 'Worng credential', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
    }
  }
  const logout = () => {
    localStorage.removeItem('it_wale_token')
    setUser(null)
  }


  const forgetPassword = async (data) => {
    let response = await api.post("/auth/forgetemail", data)
    try {
      toast.success(response.data.message || 'email sent successfully', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
    } catch (error) {
      // Handle any errors that occurred during the API call

      toast.error(error.response.data.message || 'Worng credential', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
    }

  }
  const resetPassword = async (data) => {
    let response = await api.post("/auth/resetpassword", data)
    try {
      toast.success(response.data.message || 'password reset successfully', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
      navigate("/login")
    } catch (error) {
      // Handle any errors that occurred during the API call

      toast.error(error.response.data.message || 'Worng credential', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
    }

  }



  const value = {
    user,
    isLoading,
    signup,
    login,
    logout,
    token,
    forgetPassword,
    resetPassword
  }
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (<div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 sm:h-20 sm:w-20"></div>
      </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
