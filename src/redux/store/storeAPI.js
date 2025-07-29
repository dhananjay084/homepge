// src/api/storeApi.js
import axios from 'axios';

const BASE_URL = 'http://mycouponstock-production.up.railway.app/api/stores';

export const getStoresAPI = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addStoreAPI = async (storeData) => {
  const response = await axios.post(BASE_URL, storeData);
  return response.data;
};

export const deleteStoreAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateStoreAPI = async ({ id, data }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};
export const getStoreByIdAPI = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  };
  

  