import axios from 'axios';

const API_URL = 'http://localhost:8080/api/formations';

// Fetch all Formations
export const getAllFormations = () => {
  return axios.get(API_URL);
};

// Add a new Formation
export const addFormation = (formationData) => {
  return axios.post(API_URL, formationData);
};

// Edit an existing Formation
export const updateFormation = (id, formationData) => {
  return axios.put(`${API_URL}/${id}`, formationData);
};

// Delete a Formation
export const deleteFormation = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Activate or deactivate a Formation
export const toggleActivation = (id) => {
  return axios.post(`${API_URL}/${id}/activer-desactiver`);
};

// Archive or unarchive a Formation
export const toggleArchive = (id) => {
  return axios.post(`${API_URL}/${id}/archiver-desarchiver`);
};

// Récupère toutes les formations
export const getFormations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Récupère une formation par ID
export const getFormationById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};