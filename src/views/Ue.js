import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ueService from '../services/ueService'; // Import ueService

const Ue = () => {
  const [ues, setUes] = useState([]); // Liste des UE
  const [ueData, setUeData] = useState({ code: '', libelle: '', credit: '', coefficient: '' }); // Données du formulaire
  const [showModal, setShowModal] = useState(false); // Etat pour la modale d'ajout
  const [showEditModal, setShowEditModal] = useState(false); // Etat pour la modale de modification
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Etat pour la modale de suppression
  const [editingUe, setEditingUe] = useState(null); // L'UE actuellement en cours de modification
  const [deletingUeId, setDeletingUeId] = useState(null); // L'ID de l'UE à supprimer

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Nombre d'items par page

  // Charger la liste des UE
  useEffect(() => {
    ueService.getAllUes()
      .then(response => setUes(response.data))
      .catch(error => console.error("Erreur lors du chargement des UE :", error));
  }, []);

  // Fonction pour gérer l'ajout d'un nouvel UE
  const handleAddUe = (e) => {
    e.preventDefault();
    ueService.addUe(ueData)
      .then(response => {
        setUes([...ues, response.data]);
        setShowModal(false);
        setUeData({ code: '', libelle: '', credit: '', coefficient: '' });
      })
      .catch(error => console.error("Erreur lors de l'ajout de l'UE :", error));
  };

  // Fonction pour gérer la modification d'un UE
  const handleEditUe = (e) => {
    e.preventDefault();
    if (!editingUe) {
      console.error("Aucune UE à modifier");
      return;
    }

    ueService.updateUe(editingUe.id, ueData)
      .then(response => {
        const updatedUes = ues.map(ue => ue.id === editingUe.id ? response.data : ue);
        setUes(updatedUes);
        setShowEditModal(false);
        setEditingUe(null);
        setUeData({ code: '', libelle: '', credit: '', coefficient: '' });
      })
      .catch(error => console.error("Erreur lors de la modification de l'UE :", error));
  };

  // Fonction pour gérer la suppression d'un UE
  const handleDeleteUe = () => {
    ueService.deleteUe(deletingUeId)
      .then(() => {
        setUes(ues.filter(ue => ue.id !== deletingUeId));
        setShowDeleteModal(false);
        setDeletingUeId(null);
      })
      .catch(error => console.error("Erreur lors de la suppression de l'UE :", error));
  };

  // Fonction pour afficher les informations dans le formulaire de modification
  const handleEditClick = (ue) => {
    setEditingUe(ue);
    setUeData({
      code: ue.code,
      libelle: ue.libelle,
      credit: ue.credit,
      coefficient: ue.coefficient
    });
    setShowEditModal(true);
  };

  // Fonction pour afficher la modale de suppression
  const handleDeleteClick = (id) => {
    setDeletingUeId(id);
    setShowDeleteModal(true);
  };

  // Fonction pour activer ou désactiver une UE
  const handleActivate = (id) => {
    ueService.toggleActivation(id)
      .then(response => {
        alert(response.data); // Affiche le message de succès
        // Mettre à jour la liste des UEs
        setUes(ues.map(ue => ue.id === id ? { ...ue, actif: !ue.actif } : ue));
      })
      .catch(error => {
        console.error("Erreur lors de l'activation/désactivation de l'UE :", error);
        alert("Erreur lors de l'activation/désactivation.");
      });
  };

  // Fonction pour archiver ou désarchiver une UE
  const handleArchive = (id) => {
    ueService.toggleArchive(id)
      .then(response => {
        alert(response.data); // Affiche le message de succès
        // Mettre à jour la liste des UEs
        setUes(ues.map(ue => ue.id === id ? { ...ue, archive: !ue.archive } : ue));
      })
      .catch(error => {
        console.error("Erreur lors de l'archivage/désarchivage de l'UE :", error);
        alert("Erreur lors de l'archivage/désarchivage.");
      });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUes = ues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h3 className="text-center mt-4">La liste des UE</h3>
      <button className="btn btn-success" onClick={() => setShowModal(true)}>Ajouter UE</button>

      {/* Liste des UE */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Code</th>
              <th>Libellé</th>
              <th>Crédit</th>
              <th>Coefficient</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUes.map((ue) => (
              <tr key={ue.id}>
                <td>{ue.code}</td>
                <td>{ue.libelle}</td>
                <td>{ue.credit}</td>
                <td>{ue.coefficient}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => handleEditClick(ue)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(ue.id)}>Supprimer</button>

                  {/* Bouton pour activer ou désactiver l'UE */}
                  <button 
                    className={`btn btn-${ue.actif ? 'warning' : 'success'} btn-sm`} 
                    onClick={() => handleActivate(ue.id)}
                  >
                    {ue.actif ? 'Désactiver' : 'Activer'}
                  </button>

                  {/* Bouton pour archiver ou désarchiver l'UE */}
                  <button 
                    className={`btn btn-${ue.archive ? 'secondary' : 'primary'} btn-sm`} 
                    onClick={() => handleArchive(ue.id)}
                  >
                    {ue.archive ? 'Désarchiver' : 'Archiver'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="btn btn-secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= ues.length}
        >
          Suivant
        </button>
      </div>
       
       <div className='container'>
          <Link to="/" className="btn btn-primary mt-3">
              Retourner à l'accueil
          </Link>
       </div>
      {/* Modale pour ajouter un UE */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Ajouter_UE" role="dialog" aria-labelledby="formAjouterUETitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Ajouter un UE</h4>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleAddUe}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Code</label>
                    <input type="text" className="form-control" value={ueData.code} onChange={(e) => setUeData({ ...ueData, code: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Libelle</label>
                    <input type="text" className="form-control" value={ueData.libelle} onChange={(e) => setUeData({ ...ueData, libelle: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Crédit</label>
                    <input type="number" className="form-control" value={ueData.credit} onChange={(e) => setUeData({ ...ueData, credit: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Coefficient</label>
                    <input type="number" className="form-control" value={ueData.coefficient} onChange={(e) => setUeData({ ...ueData, coefficient: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Ajouter</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Modale pour supprimer une UE */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="formDeleteTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Supprimer l'UE</h4>
                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                Êtes-vous sûr de vouloir supprimer cette UE ?
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleDeleteUe}>Supprimer</button>
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale pour modifier une UE */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Modifier_UE" role="dialog" aria-labelledby="formModifierUETitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modifier l'UE</h4>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleEditUe}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Code</label>
                    <input type="text" className="form-control" value={ueData.code} onChange={(e) => setUeData({ ...ueData, code: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Libelle</label>
                    <input type="text" className="form-control" value={ueData.libelle} onChange={(e) => setUeData({ ...ueData, libelle: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Crédit</label>
                    <input type="number" className="form-control" value={ueData.credit} onChange={(e) => setUeData({ ...ueData, credit: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Coefficient</label>
                    <input type="number" className="form-control" value={ueData.coefficient} onChange={(e) => setUeData({ ...ueData, coefficient: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Modifier</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Fermer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ue;
