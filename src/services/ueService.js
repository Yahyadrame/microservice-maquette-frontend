// src/services/ueService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ues';

// Fetch all UEs
export const getAllUes = () => {
  return axios.get(API_URL);
};

// Add a new UE
export const addUe = (ueData) => {
  return axios.post(API_URL, ueData);
};

// Edit an existing UE
export const updateUe = (id, ueData) => {
  return axios.put(`${API_URL}/${id}`, ueData);
};

// Delete a UE
export const deleteUe = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Activate or deactivate a UE
export const toggleActivation = (id) => {
  return axios.put(`${API_URL}/${id}/activer`);
};

// Archive or unarchive a UE
export const toggleArchive = (id) => {
  return axios.put(`${API_URL}/${id}/archiver`);
};

// Récupère toutes les UEs
export const getUEs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Récupère une UE par ID
export const getUEById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};