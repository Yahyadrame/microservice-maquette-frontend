import React, { useEffect, useState } from 'react';
import * as ecService from '../services/ecService';
import axios from 'axios';
import { Link } from 'react-router-dom';
const UE_API_URL = 'http://localhost:8080/api/ues';

const Ec = () => {
    const [ues, setUes] = useState([]);
    const [selectedUe, setSelectedUe] = useState('');
    const [ecs, setEcs] = useState([]);
    const [newEc, setNewEc] = useState({ code: '', libelle: '', cm: '', td: '', tp: '', tpe: '', vht: '', coefficient: '' });
    const [editEc, setEditEc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ecToDelete, setEcToDelete] = useState(null);
    const [refreshEcs, setRefreshEcs] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    useEffect(() => {
        axios.get(UE_API_URL)
            .then(response => setUes(response.data))
            .catch(error => console.error("Error fetching UEs:", error));
    }, []);

    useEffect(() => {
        if (selectedUe) {
            setLoading(true);
            ecService.getEcsByUeId(selectedUe)
                .then(fetchedEcs => setEcs(fetchedEcs))
                .catch(error => console.error("Error loading ECs:", error))
                .finally(() => setLoading(false));
        }
    }, [selectedUe, refreshEcs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEc({ ...newEc, [name]: name === "code" || name === "libelle" ? value : Number(value) || 0 });
    };

    const handleAddOrEditEc = async (e) => {
        e.preventDefault();
        if (!newEc.code || !newEc.libelle || !selectedUe) {
            alert('Please fill in all fields and select a UE.');
            return;
        }

        const ecData = { ...newEc, ueId: selectedUe };

        try {
            if (editEc) {
                await ecService.updateEc(editEc.id, ecData);
            } else {
                await ecService.addEc(ecData);
            }

            resetForm();
            setEcs([]); // Clear the list before re-fetching data
            ecService.getEcsByUeId(selectedUe)
                .then(fetchedEcs => setEcs(fetchedEcs))
                .catch(error => console.error("Error reloading ECs:", error));
        } catch (error) {
            console.error("Error adding or updating EC:", error);
        }
    };

    const resetForm = () => {
        setNewEc({ code: '', libelle: '', cm: '', td: '', tp: '', tpe: '', vht: '', coefficient: '' });
        setEditEc(null);
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const handleEdit = (ec) => {
        setEditEc(ec);
        setNewEc(ec);
        setShowEditModal(true);
    };

    const handleDelete = async () => {
        if (!ecToDelete) return;
        try {
            await ecService.deleteEc(ecToDelete.id);
            setEcs(ecs.filter(ec => ec.id !== ecToDelete.id));
            setShowDeleteModal(false);
            setRefreshEcs(prev => !prev); // Refresh after delete
        } catch (error) {
            console.error("Error deleting EC:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedEcs = ecs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const totalPages = Math.ceil(ecs.length / pageSize);

    return (
        <div className="container">
            <h2 className="text-center mt-4">Gestion des ECs</h2>

            <label className="mb-2 text-lg">Sélectionnez une UE :</label>
            <select
                onChange={(e) => setSelectedUe(e.target.value)}
                value={selectedUe}
                className="border border-gray-300 p-2 mb-4 w-80"
            >
                <option value="">Sélectionnez une UE</option>
                {ues.map(ue => (
                    <option key={ue.id} value={ue.id}>{ue.code}</option>
                ))}
            </select>

            {loading ? <p>Chargement des ECs...</p> : (
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Libellé</th>
                                <th>CM</th>
                                <th>TD</th>
                                <th>TP</th>
                                <th>TPE</th>
                                <th>VH</th>
                                <th>Coefficient</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEcs.map(ec => (
                                <tr key={ec.id}>
                                    <td>{ec.code}</td>
                                    <td>{ec.libelle}</td>
                                    <td>{ec.cm}</td>
                                    <td>{ec.td}</td>
                                    <td>{ec.tp}</td>
                                    <td>{ec.tpe}</td>
                                    <td>{ec.vht}</td>
                                    <td>{ec.coefficient}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => handleEdit(ec)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => { setEcToDelete(ec); setShowDeleteModal(true); }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="btn btn-info btn-sm"
                onClick={() => setShowAddModal(true)}
            >
                Ajouter un EC
            </button>

            {/* Pagination */}
            <div className="pagination mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Précédent
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Suivant
                </button>
            </div>
             {/* pour le button retour */}
             <div className='container'>
               <Link to="/" className="btn btn-primary mt-3">
                  Retourner à l'accueil
                </Link>
            </div>

            {/* Add EC Modal */}
            {showAddModal && (
                <div className="modal fade show" style={{ display: 'block' }} id="addEcModal" role="dialog" aria-labelledby="addEcModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Ajouter un EC</h4>
                                <button type="button" className="close" onClick={() => setShowAddModal(false)}>&times;</button>
                            </div>
                            <form onSubmit={handleAddOrEditEc}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            placeholder='Code'
                                            value={newEc.code}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Libellé</label>
                                        <input
                                            type="text"
                                            placeholder='Libelle'
                                            className="form-control"
                                            name="libelle"
                                            value={newEc.libelle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mb-4">
                                        <input
                                            type="number"
                                            name="cm"
                                            placeholder="CM"
                                            value={newEc.cm}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        <input
                                            type="number"
                                            name="td"
                                            placeholder="TD"
                                            value={newEc.td}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        <input
                                            type="number"
                                            name="tp"
                                            placeholder="TP"
                                            value={newEc.tp}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        <input
                                            type="number"
                                            name="tpe"
                                            placeholder="TPE"
                                            value={newEc.tpe}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        <input
                                            type="number"
                                            name="vht"
                                            placeholder="VH"
                                            value={newEc.vht}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        <input
                                            type="number"
                                            name="coefficient"
                                            placeholder="Coefficient"
                                            value={newEc.coefficient}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Ajouter</button>
                                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Fermer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit EC Modal */}
            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block' }} id="editEcModal" role="dialog" aria-labelledby="editEcModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Modifier un EC</h4>
                                <button type="button" className="close" onClick={() => setShowEditModal(false)}>&times;</button>
                            </div>
                            <form onSubmit={handleAddOrEditEc}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="code"
                                            value={newEc.code}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Libellé</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="libelle"
                                            value={newEc.libelle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="cm"
                                        value={newEc.cm}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="td"
                                        value={newEc.td}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="tp"
                                        value={newEc.tp}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="tpe"
                                        value={newEc.tpe}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="vht"
                                        value={newEc.vht}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="coefficient"
                                        value={newEc.coefficient}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-warning">Modifier</button>
                                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Fermer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete EC Modal */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} id="deleteEcModal" role="dialog" aria-labelledby="deleteEcModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Supprimer un EC</h4>
                                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Êtes-vous sûr de vouloir supprimer cet EC ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ec;
