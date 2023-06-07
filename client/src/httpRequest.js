import api from './api';

const fetchData = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
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

export {fetchData,fetchDataSingle};
