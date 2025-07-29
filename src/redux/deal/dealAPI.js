import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/deals'; // adjust for production if needed

export const getAllDeals = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createDeal = async (deal) => {
  const response = await axios.post(BASE_URL, deal);
  return response.data;
};

export const deleteDealById = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateDealById = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, data);
  return response.data;
};
export const getDealById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  };
  