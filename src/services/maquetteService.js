import axios from 'axios';

const API_URL = 'http://localhost:8080/api/maquettes'; // URL de l'API backend

// Récupérer toutes les maquettes
export const getMaquettes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des maquettes", error);
        throw error;
    }
};

// Récupérer une maquette par son ID
export const getMaquetteById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`); // ✅ Corrigé avec backticks
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la maquette", error);
        throw error;
    }
};

// Ajouter une nouvelle maquette
export const addMaquette = async (maquette) => {
    try {
        console.log("Données envoyées au backend :", maquette); // Log des données
        const response = await axios.post(API_URL, maquette);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la maquette", error.response?.data || error.message);
        throw error;
    }
};



// Modifier une maquette existante
export const updateMaquette = async (id, maquette) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, maquette); // ✅ Corrigé avec backticks
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la modification de la maquette", error);
        throw error;
    }
};

// Supprimer une maquette
export const deleteMaquette = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // ✅ Corrigé avec backticks
    } catch (error) {
        console.error("Erreur lors de la suppression de la maquette", error);
        throw error;
    }
};

// Activer ou désactiver une maquette
export const activerOuDesactiverMaquette = async (id) => {
    try {
        await axios.post(`${API_URL}/${id}/activer-desactiver`); // ✅ Corrigé avec backticks
    } catch (error) {
        console.error("Erreur lors de l'activation/désactivation de la maquette", error);
        throw error;
    }
};

// Archiver ou désarchiver une maquette
export const archiverOuDesarchiverMaquette = async (id) => {
    try {
        await axios.post(`${API_URL}/${id}/archiver-desarchiver`); // ✅ Corrigé avec backticks
    } catch (error) {
        console.error("Erreur lors de l'archivage/désarchivage de la maquette", error);
        throw error;
    }
};
