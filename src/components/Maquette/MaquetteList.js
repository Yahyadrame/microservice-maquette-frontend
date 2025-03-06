import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMaquettes, deleteMaquette, activerOuDesactiverMaquette, archiverOuDesarchiverMaquette } from '../../services/maquetteService';

const MaquetteList = () => {
    const [maquettes, setMaquettes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);  // Nombre de maquettes par page
    const [totalPages, setTotalPages] = useState(1); // Total des pages

    useEffect(() => {
        fetchMaquettes();
    }, [currentPage]);

    const fetchMaquettes = async () => {
        try {
            const data = await getMaquettes();
            setMaquettes(Array.isArray(data) ? data : []);
            setTotalPages(Math.ceil(data.length / pageSize)); // Calcul du nombre total de pages
        } catch (error) {
            console.error("Erreur lors de la récupération des maquettes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette maquette ?")) {
            try {
                await deleteMaquette(id);
                fetchMaquettes();
            } catch (error) {
                console.error("Erreur lors de la suppression de la maquette", error);
            }
        }
    };

    const handleActiverDesactiver = async (id) => {
        try {
            await activerOuDesactiverMaquette(id);
            fetchMaquettes();
        } catch (error) {
            console.error("Erreur lors de l'activation/désactivation de la maquette", error);
        }
    };

    const handleArchiverDesarchiver = async (id) => {
        try {
            await archiverOuDesarchiverMaquette(id);
            fetchMaquettes();
        } catch (error) {
            console.error("Erreur lors de l'archivage/désarchivage de la maquette", error);
        }
    };

    // Fonction pour calculer la portion des maquettes à afficher en fonction de la page actuelle
    const getPagedMaquettes = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return maquettes.slice(startIndex, endIndex);
    };

    // Gestion des pages de pagination
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <p>Chargement des maquettes...</p>;
    }

    const pagedMaquettes = getPagedMaquettes();

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Liste des Maquettes</h2>
            <Link to="/add" className="btn btn-primary mb-3">Ajouter une maquette</Link>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Semestres</th>
                        <th>Classe</th>
                        <th>Formation</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedMaquettes.length > 0 ? (
                        pagedMaquettes.map((maquette) => (
                            <tr key={maquette.id}>
                                <td>{maquette?.nom ?? 'N/A'}</td>
                                <td>{maquette?.semestres ?? 'N/A'}</td>
                                <td>{maquette?.classeNom ?? 'Non défini'}</td>
                                <td>{maquette?.formationNom ?? 'Non défini'}</td>
                                <td>{maquette?.actif ? 'Actif' : 'Inactif'}</td>
                                <td>
                                    <Link to={`/details/${maquette.id}`} className="btn btn-info me-2">Détails</Link>
                                    <Link to={`/edit/${maquette.id}`} className="btn btn-warning me-2">Modifier</Link>
                                    <button onClick={() => handleDelete(maquette.id)} className="btn btn-danger me-2">Supprimer</button>
                                    <button onClick={() => handleActiverDesactiver(maquette.id)} className="btn btn-secondary me-2">
                                        {maquette?.actif ? 'Désactiver' : 'Activer'}
                                    </button>
                                    <button onClick={() => handleArchiverDesarchiver(maquette.id)} className="btn btn-secondary">
                                        {maquette?.archive ? 'Désarchiver' : 'Archiver'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Aucune maquette trouvée.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-secondary me-2"
                >
                    Précédent
                </button>
                <span className="align-self-center">{`Page ${currentPage} sur ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary ms-2"
                >
                    Suivant
                </button>
            </div>
             
         <div className='container'>
             <Link to="/" className="btn btn-primary mt-3">
                Retourner à l'accueil
             </Link>
         </div>
        </div>
    );
};

export default MaquetteList;
