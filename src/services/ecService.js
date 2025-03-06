import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ecs';
const UE_API_URL = 'http://localhost:8080/api/ues';

// Récupérer tous les ECs d'une UE donnée
export const getEcsByUeId = async (ueId) => {
  try {
    const response = await axios.get(`${API_URL}/ue/${ueId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des ECs:", error);
    throw error;
  }
};

// Récupérer les détails d'une UE par son ID
export const getUeDetailsById = async (ueId) => {
  try {
    const response = await axios.get(`${UE_API_URL}/${ueId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'UE:", error);
    throw error;
  }
};

// Ajouter un EC en lui passant directement l'ID de l'UE
export const addEc = async (ecData) => {
  try {
    const response = await axios.post(API_URL, ecData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'EC:", error);
    throw error;
  }
};

// Modifier un EC
export const updateEc = async (id, ecData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, ecData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'EC:", error);
    throw error;
  }
};

// Supprimer un EC
export const deleteEc = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'EC:", error);
    throw error;
  }
};
