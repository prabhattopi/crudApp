import React, { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import moment from 'moment';
import { toast } from 'react-toastify';
import { fetchData } from '../../httpRequest';

export const ItemContext = createContext();

const initialState = {
  user: '',
  description: '',
  occupation:"",
  scheduleTime: '',
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
      case 'SET_OCCUPATION':
        return { ...state, occupation: action.payload };
    case 'SET_SCHEDULE_TIME':
      return { ...state, scheduleTime: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'RESET_FIELDS':
      return { ...state, user: '', description: '', scheduleTime: '' };
    default:
      return state;
  }
};

const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const { user, description, scheduleTime, loading,occupation } = state;

  const postData = async (setItems) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

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
      const response = scheduleTime
        ? await api.post('/items', { user, description, occupation, scheduleTime: formattedDate }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
            },
          })
        : await api.post('/items', { user, description,occupation }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
            },
          });
      console.log(response);

      if (response.status === 201) {
        toast.success(response.data || 'Post created successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });

        await fetchData().then((data) => setItems(data));

        dispatch({ type: 'RESET_FIELDS' });

        navigate('/');
      } else {
        toast.error(response.data || 'Failed to create Post', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      toast.error('Failed to create Post', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const value = {
    postData,
    loading,
    setDescription: (value) => dispatch({ type: 'SET_DESCRIPTION', payload: value }),
    setScheduleTime: (value) => dispatch({ type: 'SET_SCHEDULE_TIME', payload: value }),
    setUser: (value) => dispatch({ type: 'SET_USER', payload: value }),
    user,
    description,
    scheduleTime,
    dispatch,
    state
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export default ItemProvider;
