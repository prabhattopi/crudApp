import moment from 'moment';
import api from './api';

const fetchData = async () => {
  try {
    const response = await api.get('/items');
    const currentTimestamp = moment(); // Get the current time
    
    const timeData = response.data.filter(item => {
      const scheduleTime = moment(item.scheduleTime); // Convert the scheduleTime to a Moment.js object
      
      // Compare year, month, day, hour, and minute of the two timestamps
      return scheduleTime.isSameOrBefore(currentTimestamp, 'minute');
    });
    
    console.log(timeData);
    return timeData;
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
