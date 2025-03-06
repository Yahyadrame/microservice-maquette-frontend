import axios from 'axios';

const API_URL = 'http://localhost:8080/api/classes';

// Récupérer toutes les formations
export const getFormations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/formations');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des formations:", error);
    throw error;
  }
};

// Récupérer les classes par formation
export const getClassesByFormationId = async (formationId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/classes/formation/${formationId}`);
    return response.data;  // Retourne les classes correspondant à cette formation
  } catch (error) {
    console.error("Erreur lors de la récupération des classes:", error);
    throw error;
  }
};

// Ajouter une classe
export const addClasse = async (classeData) => {
  try {
    const response = await axios.post(API_URL, classeData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la classe:", error);
    throw error;
  }
};

// Modifier une classe
export const updateClasse = async (id, classeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, classeData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la classe:", error);
    throw error;
  }
};

// Supprimer une classe
export const deleteClasse = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la classe:", error);
    throw error;
  }
};

// Activer/Désactiver une classe
export const toggleActiveClasse = async (id) => {
  try {
    await axios.post(`${API_URL}/${id}/activer-desactiver`);
  } catch (error) {
    console.error("Erreur lors de l'activation/désactivation de la classe:", error);
    throw error;
  }
};

// Archiver/Désarchiver une classe
export const toggleArchivedClasse = async (id) => {
  try {
    await axios.post(`${API_URL}/${id}/archiver-desarchiver`);
  } catch (error) {
    console.error("Erreur lors de l'archivage/désarchivage de la classe:", error);
    throw error;
  }
};

// Récupère toutes les classes
export const getClasses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des classes:", error);
    throw error;
  }
};

// Récupère une classe par ID
export const getClasseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la classe:", error);
    throw error;
  }
};
