import moment from 'moment';
import api from './api';

const fetchData = async (offset=0,limit=10) => {
  try {
    const response = await api.get(`/items?offset=${offset}&limit=${limit}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
      },
    });
    const currentTimestamp = moment(); // Get the current time
    
    const timeData = response.data.items.filter(item => {
      const scheduleTime = moment(item.scheduleTime); // Convert the scheduleTime to a Moment.js object
      
      // Compare year, month, day, hour, and minute of the two timestamps
      return scheduleTime.isSameOrBefore(currentTimestamp, 'minute');
    });
    return {items:timeData,hasmore:response.data.hasMore};
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

const fetchDataSingle = async (id) => {
  try {
    const response = await api.get(`/items/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

export { fetchData, fetchDataSingle };
