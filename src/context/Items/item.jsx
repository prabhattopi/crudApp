import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api'
import moment from 'moment';
import { toast } from 'react-toastify';
import { fetchData } from '../../httpRequest';
export const ItemContext = createContext()
const ItemProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');

  const [scheduleTime, setScheduleTime] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const postData = async (setItems) => {
    try {

      setLoading(true)
      const timeString = scheduleTime; // The time in HH:mm format

      // Get the current date in IST
      const currentDateIST = moment().utcOffset('+05:30').format('YYYY-MM-DD');

      // Concatenate the current date in IST and the time string
      const timestampStringIST = `${currentDateIST} ${timeString}`;

      // Create a Moment object from the IST timestamp string
      const timestampIST = moment(timestampStringIST, 'YYYY-MM-DD HH:mm').toDate();

      console.log(timestampIST); // The IST timestamp in Date object format
      const date = new Date(timestampIST);

      const formattedDate = date.toISOString();

      console.log(formattedDate); // '2023-06-08T10:09:41.784Z'
      const response = scheduleTime ? await api.post('/items', { user, description, scheduleTime: formattedDate }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
        },
      }) : await api.post('/items', { user, description },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
        },
      })
      console.log(response)
      // Clear the form fields after successful submission
      if (response.status == 201) {
        // Show a success toast notification with a custom message from the backend
        toast.success(response.data || 'Post created successfully', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false, // Hide the progress bar
        });
        // Clear the form fields after successful submission
        await fetchData().then((data) => setItems(data))
        setUser('');
        setDescription('');
        setScheduleTime('');

        navigate("/");
        // Perform any additional actions after successful submission
      } else {
        // Show an error toast notification with a custom message from the backend
        toast.error(response.data || 'Failed to create Post', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false, // Hide the progress bar
        });
      }
      setLoading(false)
      // ...
    } catch (error) {
      // Show an error toast notification for any other errors
      toast.error('Failed to create Post', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false, // Hide the progress bar
      });
    }
  }


  const value = {
    postData,
    loading,
    setDescription,
    setScheduleTime,
    setUser,
    user,
    description,
    scheduleTime
  }
  return (
    <ItemContext.Provider value={value}>
   {children}
    </ItemContext.Provider>
  )
}

export default ItemProvider
