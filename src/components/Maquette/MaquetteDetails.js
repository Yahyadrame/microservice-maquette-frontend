import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMaquetteById } from '../../services/maquetteService';

const MaquetteDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Hook de navigation pour revenir à la liste
    const [maquette, setMaquette] = useState({ ues: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaquette = async () => {
            try {
                const data = await getMaquetteById(id);
                setMaquette(data || { ues: [] });
            } catch (error) {
                console.error("Erreur lors de la récupération de la maquette", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaquette();
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!maquette || Object.keys(maquette).length === 0) {
        return <div>Aucune maquette trouvée.</div>;
    }

    if (!maquette.ues || maquette.ues.length === 0) {
        return <div>Aucune UE trouvée dans cette maquette.</div>;
    }

    return (
        <div className="maquette-details">
            <h2>Détails de la maquette</h2>
            <h3>
                {maquette.formationNom || 'Formation non définie'} - {maquette.classeNom || 'Classe non définie'}
            </h3>

            {/* Bouton Retour */}
            <button onClick={() => navigate('/liste')} className="btn btn-secondary mb-3">
                Retour à la liste
            </button>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="11">{maquette.semestres || 'Semestres non définis'}</th>
                        </tr>
                        <tr>
                            <th colSpan="3">UNITÉS D'ENSEIGNEMENT (UE)</th>
                            <th colSpan="8">ÉLÉMENTS CONSTITUTIFS (EC)</th>
                        </tr>
                        <tr>
                            <th>Code et Intitulé UE</th>
                            <th>Crédit</th>
                            <th>Coefficient</th>
                            <th>Intitulé EC</th>
                            <th>CM</th>
                            <th>TD</th>
                            <th>TP</th>
                            <th>CM+TD+TP</th>
                            <th>TPE</th>
                            <th>VHT</th>
                            <th>Coefficient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maquette.ues.map((ue) => (
                            <tr key={ue.id}>
                                <td>{ue.code} - {ue.libelle}</td>
                                <td>{ue.credit}</td>
                                <td>{ue.coefficient}</td>

                                {/* Tableau des EC à l'intérieur de chaque UE */}
                                <td colSpan="8">
                                    <table className="table table-sm table-bordered">
                                        <tbody>
                                            {ue.ecs && ue.ecs.length > 0 ? (
                                                ue.ecs.map((ec) => {
                                                    return (
                                                        <tr key={ec.id}>
                                                            <td>{ec.libelle}</td>
                                                            <td>{ec.cm}</td>
                                                            <td>{ec.td}</td>
                                                            <td>{ec.tp}</td>
                                                            <td>{ec.tp + ec.td + ec.cm}</td> {/* Affichage de la somme */}
                                                            <td>{ec.tpe}</td>
                                                            <td>{ec.vht}</td>
                                                            <td>{ec.coefficient}</td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center">Aucun EC trouvé pour cette UE.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaquetteDetails;
