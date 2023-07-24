import React, { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import moment from 'moment';
import { toast } from 'react-toastify';
import { throttle } from 'lodash';
import { fetchData } from '../../httpRequest';

export const ItemContext = createContext();

const initialState = {
  items: [],
  user: '',
  description: '',
  occupation: "",
  social_links: [],
  img: "https://firebasestorage.googleapis.com/v0/b/image-gallery-8cf2b.appspot.com/o/images%2F1689583584637.webp?alt=media&token=5320ad10-a9d0-491b-8f9f-130cffdaa3b2",
  comments: [],
  scheduleTime: '',
  likeDislikeStatus: false,
  loading: false,
  singleData: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEM':
      return { ...state, items: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_OCCUPATION':
      return { ...state, occupation: action.payload };
    case 'SET_IMG':
      return { ...state, img: action.payload };
    case 'SET_SOCIAL_LINKS':
      return { ...state, social_links: [...state.social_links, action.payload] };
    case 'SET_SCHEDULE_TIME':
      return { ...state, scheduleTime: action.payload };
    case 'SET_LIKE_DISLIKE':
      return { ...state, likeDislikeStatus: !state.likeDislikeStatus };
    case 'SET_SINGLE':
      return { ...state, singleData: action.payload };
    case "REMOVE_SINGLE":
      return { ...state, singleData: {} }

    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'RESET_FIELDS':
      return { ...state, ...initialState };
    default:
      return state;
  }
};

const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const { user, description, scheduleTime, loading, occupation, social_links, img } = state;

  const postData = async () => {
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
        ? await api.post('/items', { user, description, occupation, social_links, img, scheduleTime: formattedDate }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
          },
        })
        : await api.post('/items', { user, description, occupation, social_links, img }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
          },
        });

      if (response.status === 201) {
        toast.success(response.data || 'Post created successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });


        fetchData()
          .then((data) => dispatch({ type: "SET_ITEM", payload: data }))
          .catch((error) => console.error("Failed to fetch items:", error));
        dispatch({ type: 'RESET_FIELDS' });

        navigate('/');
      } else {
        toast.error(response.data || 'Failed to create Post', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      }


    } catch (error) {
      toast.error('Failed to create Post', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };
  const handleLikeDislike = async (obj) => {
    try {
      let res = await api.post('/items/count', obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
        },
      })
      if (res.status == "200") {
        dispatch({ type: "SET_LIKE_DISLIKE" })
      }

    }
    catch (err) {
      console.log(err.response.data.message)


    }
  };
  // const singleDataFunction=(id)=>{


  // }

  const throttledHandleLikeDislike = throttle(handleLikeDislike, 1000);


  useEffect(() => {
    fetchData()
      .then((data) => dispatch({ type: "SET_ITEM", payload: data }))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, [state.likeDislikeStatus]);

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
    state,
    handleLikeDislike: throttledHandleLikeDislike
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export default ItemProvider;
