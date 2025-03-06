import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMaquetteById, addMaquette, updateMaquette } from '../../services/maquetteService';
import { getClasses } from '../../services/classeService';
import { getFormations } from '../../services/formationService';
import { getUEs } from '../../services/ueService';

const MaquetteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [maquette, setMaquette] = useState({
        nom: '',
        semestres: '',
        classeId: '',
        formationId: '',
        uesIds: [], // Initialement vide ou avec les UE existantes
        archive: false
    });

    const [classes, setClasses] = useState([]);
    const [formations, setFormations] = useState([]);
    const [ues, setUes] = useState([]);

    // Fonction pour récupérer les données de la maquette si un ID est fourni
    const fetchMaquette = useCallback(async () => {
        if (id) {
            try {
                const data = await getMaquetteById(id);
                if (data) {
                    setMaquette({
                        nom: data.nom || '',
                        semestres: data.semestres || '',
                        classeId: data.classeId || '',
                        formationId: data.formationId || '',
                        uesIds: Array.isArray(data.uesIds) ? data.uesIds : [], // Initialisation des UEs
                        archive: data.archive || false
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la maquette", error);
            }
        }
    }, [id]);

    // Récupérer les classes, formations et UEs une fois que la maquette est prête
    useEffect(() => {
        const fetchData = async () => {
            try {
                const classesData = await getClasses();
                const formationsData = await getFormations();
                const uesData = await getUEs();
                setClasses(classesData);
                setFormations(formationsData);
                setUes(uesData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données", error);
            }
        };

        fetchData();
        fetchMaquette();
    }, [id, fetchMaquette]);

    // Gestion du changement des champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaquette({ ...maquette, [name]: value });
    };

    // Gestion de la sélection des UEs via les cases à cocher
    const handleUEChange = (e) => {
        const { value, checked } = e.target;
        setMaquette(prevState => {
            const newUesIds = checked
                ? [...prevState.uesIds, Number(value)]  // Ajout de l'UE
                : prevState.uesIds.filter(ueId => ueId !== Number(value));  // Retrait de l'UE
            return { ...prevState, uesIds: newUesIds };
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...maquette,
                classeId: Number(maquette.classeId),
                formationId: Number(maquette.formationId),
                uesIds: maquette.uesIds.map(Number), // Conversion des UEs en nombres
            };

            if (id) {
                // Si `id` existe, mise à jour de la maquette
                formattedData.archive = maquette.archive;
                await updateMaquette(id, formattedData);
            } else {
                // Si pas d'`id`, ajout d'une nouvelle maquette
                await addMaquette(formattedData);
            }
            navigate('/liste'); // Redirection après la soumission
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la maquette", error);
        }
    };

    return (
        <div className="maquette-form">
            <h2>{id ? 'Modifier' : 'Ajouter'} une maquette</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" name="nom" value={maquette.nom} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Semestres</label>
                    <input type="text" name="semestres" value={maquette.semestres} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Classe</label>
                    <select name="classeId" value={maquette.classeId} onChange={handleChange} className="form-select" required>
                        <option value="">-- Sélectionner une classe --</option>
                        {classes.map((classe) => (
                            <option key={classe.id} value={classe.id}>{classe.nom}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Formation</label>
                    <select name="formationId" value={maquette.formationId} onChange={handleChange} className="form-select" required>
                        <option value="">-- Sélectionner une formation --</option>
                        {formations.map((formation) => (
                            <option key={formation.id} value={formation.id}>{formation.nom}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">UEs</label>
                    <div>
                        {ues.map((ue) => (
                            <div key={ue.id}>
                                <input
                                    type="checkbox"
                                    id={`ue-${ue.id}`}
                                    value={ue.id}
                                    checked={maquette.uesIds.includes(ue.id)} // Si l'UE est dans `uesIds`, elle est cochée
                                    onChange={handleUEChange}
                                    className="form-check-input"
                                />
                                <label htmlFor={`ue-${ue.id}`} className="form-check-label">{ue.libelle}</label>
                            </div>
                        ))}
                    </div>
                </div>
                {id && ( // Afficher le champ Archive uniquement lors de la modification
                    <div className="mb-3">
                        <label className="form-label">Archiver</label>
                        <input
                            type="checkbox"
                            name="archive"
                            checked={maquette.archive}
                            onChange={(e) => setMaquette({ ...maquette, archive: e.target.checked })}
                            className="form-check-input"
                        />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">{id ? 'Modifier' : 'Ajouter'}</button>
            </form>
        </div>
    );
};

export default MaquetteForm;
