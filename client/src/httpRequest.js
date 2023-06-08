import moment from 'moment';
import api from './api';

const fetchData = async () => {
  try {
    const response = await api.get('/items');
    const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // Get the current time
    console.log(response.data)
    const timeData = response.data.filter(item => {
      const scheduleTime =item.scheduleTime;

// Convert the scheduleTime to IST (Indian Standard Time)
const scheduleTimeIST = moment(scheduleTime).utcOffset('+05:30');

// Calculate the number of seconds since the Unix epoch for the scheduleTime in IST
let secondsSinceEpochIST = scheduleTimeIST.startOf('second').unix();
 secondsSinceEpochIST = moment.unix(secondsSinceEpochIST).format('YYYY-MM-DD HH:mm:ss');
const [Futurehours, Futureminutes] = moment(secondsSinceEpochIST, 'YYYY-MM-DD HH:mm:ss').format('HH:mm').split(':');

// Calculate the total seconds
const totalSecondsFuture = Futurehours * 3600 + Futureminutes * 60;

console.log(totalSecondsFuture); 
const [Currenthours, Currentminutes] = moment(currentTimestamp, 'YYYY-MM-DD HH:mm:ss').format('HH:mm').split(':');

// Calculate the total seconds
const totalSecondscurrent = Currenthours * 3600 + Currentminutes * 60;

console.log(totalSecondscurrent); 
return totalSecondsFuture<=totalSecondscurrent
    });
    console.log(timeData)
    return timeData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

const fetchDataSingle = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

export { fetchData, fetchDataSingle };
