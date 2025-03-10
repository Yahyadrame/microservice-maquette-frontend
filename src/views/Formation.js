import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as formationService from '../services/formationService'; // Update to formationService

const Formation = () => {
  const [formations, setFormations] = useState([]); // Liste des Formations
  const [formationData, setFormationData] = useState({ nom: '', duree: '', description: '', niveau: '' }); // Données du formulaire
  const [showModal, setShowModal] = useState(false); // Etat pour la modale d'ajout
  const [showEditModal, setShowEditModal] = useState(false); // Etat pour la modale de modification
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Etat pour la modale de suppression
  const [editingFormation, setEditingFormation] = useState(null); // La Formation actuellement en cours de modification
  const [deletingFormationId, setDeletingFormationId] = useState(null); // L'ID de la Formation à supprimer

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Nombre d'items par page

  // Charger la liste des Formations
  useEffect(() => {
    formationService.getAllFormations()
      .then(response => setFormations(response.data))
      .catch(error => console.error("Erreur lors du chargement des Formations :", error));
  }, []);

  // Fonction pour gérer l'ajout d'une nouvelle Formation
  const handleAddFormation = (e) => {
    e.preventDefault();
    formationService.addFormation(formationData)
      .then(response => {
        setFormations([...formations, response.data]);
        setShowModal(false);
        setFormationData({ nom: '', duree: '', description: '', niveau:'' });
      })
      .catch(error => console.error("Erreur lors de l'ajout de la Formation :", error));
  };

  // Fonction pour gérer la modification d'une Formation
  const handleEditFormation = (e) => {
    e.preventDefault();
    if (!editingFormation) {
      console.error("Aucune Formation à modifier");
      return;
    }

    formationService.updateFormation(editingFormation.id, formationData)
      .then(response => {
        const updatedFormations = formations.map(formation => formation.id === editingFormation.id ? response.data : formation);
        setFormations(updatedFormations);
        setShowEditModal(false);
        setEditingFormation(null);
        setFormationData({ nom: '', duree: '', description: '', niveau:'' });
      })
      .catch(error => console.error("Erreur lors de la modification de la Formation :", error));
  };

  // Fonction pour gérer la suppression d'une Formation
  const handleDeleteFormation = () => {
    formationService.deleteFormation(deletingFormationId)
      .then(() => {
        setFormations(formations.filter(formation => formation.id !== deletingFormationId));
        setShowDeleteModal(false);
        setDeletingFormationId(null);
      })
      .catch(error => console.error("Erreur lors de la suppression de la Formation :", error));
  };

  // Fonction pour afficher les informations dans le formulaire de modification
  const handleEditClick = (formation) => {
    setEditingFormation(formation);
    setFormationData({
      nom: formation.nom,
      duree: formation.duree,
      description: formation.description,
      niveau: formation.niveau
    });
    setShowEditModal(true);
  };

  // Fonction pour afficher la modale de suppression
  const handleDeleteClick = (id) => {
    setDeletingFormationId(id);
    setShowDeleteModal(true);
  };

  // Fonction pour activer ou désactiver une Formation
  const handleActivate = (id) => {
    formationService.toggleActivation(id)
      .then(response => {
        alert(response.data); // Affiche le message de succès
        setFormations(formations.map(formation => formation.id === id ? { ...formation, actif: !formation.actif } : formation));
      })
      .catch(error => {
        console.error("Erreur lors de l'activation/désactivation de la Formation :", error);
        alert("Erreur lors de l'activation/désactivation.");
      });
  };

  // Fonction pour archiver ou désarchiver une Formation
  const handleArchive = (id) => {
    formationService.toggleArchive(id)
      .then(response => {
        alert(response.data); // Affiche le message de succès
        setFormations(formations.map(formation => formation.id === id ? { ...formation, archive: !formation.archive } : formation));
      })
      .catch(error => {
        console.error("Erreur lors de l'archivage/désarchivage de la Formation :", error);
        alert("Erreur lors de l'archivage/désarchivage.");
      });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFormations = formations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h3 className="text-center mt-4">La liste des Formations</h3>
      <button className="btn btn-success" onClick={() => setShowModal(true)}>Ajouter Formation</button>

      {/* Liste des Formations */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Durée</th>
              <th>Description</th>
              <th>Niveau</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFormations.map((formation) => (
              <tr key={formation.id}>
                <td>{formation.nom}</td>
                <td>{formation.duree} ans</td>
                <td>{formation.description}</td>
                <td>{formation.niveau}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => handleEditClick(formation)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(formation.id)}>Supprimer</button>

                  {/* Bouton pour activer ou désactiver la Formation */}
                  <button 
                    className={`btn btn-${formation.actif ? 'warning' : 'success'} btn-sm`} 
                    onClick={() => handleActivate(formation.id)}
                  >
                    {formation.actif ? 'Désactiver' : 'Activer'}
                  </button>

                  {/* Bouton pour archiver ou désarchiver la Formation */}
                  <button 
                    className={`btn btn-${formation.archive ? 'secondary' : 'primary'} btn-sm`} 
                    onClick={() => handleArchive(formation.id)}
                  >
                    {formation.archive ? 'Désarchiver' : 'Archiver'}
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
          disabled={indexOfLastItem >= formations.length}
        >
          Suivant
        </button>
      </div>

      {/* Bouton retour */}
      <div className='container'>
        <Link to="/" className="btn btn-primary mt-3">
          Retourner à l'accueil
        </Link>
      </div>

      {/* Modale pour ajouter une Formation */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Ajouter_Formation" role="dialog" aria-labelledby="formAjouterFormationTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Ajouter une Formation</h4>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleAddFormation}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" value={formationData.nom} onChange={(e) => setFormationData({ ...formationData, nom: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Durée</label>
                    <input type="number" className="form-control" value={formationData.duree} onChange={(e) => setFormationData({ ...formationData, duree: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={formationData.description} onChange={(e) => setFormationData({ ...formationData, description: e.target.value })}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Niveau</label>
                    <input type="text" className="form-control" value={formationData.niveau} onChange={(e) => setFormationData({ ...formationData, niveau: e.target.value })} />
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

      {/* Modale pour modifier une Formation */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Modifier_Formation" role="dialog" aria-labelledby="formModifierFormationTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modifier une Formation</h4>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleEditFormation}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" value={formationData.nom} onChange={(e) => setFormationData({ ...formationData, nom: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Durée</label>
                    <input type="number" className="form-control" value={formationData.duree} onChange={(e) => setFormationData({ ...formationData, duree: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={formationData.description} onChange={(e) => setFormationData({ ...formationData, description: e.target.value })}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Niveau</label>
                    <input type="text" className="form-control" value={formationData.niveau} onChange={(e) => setFormationData({ ...formationData, niveau: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Modifier</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Fermer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modale pour supprimer une Formation */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Supprimer_Formation" role="dialog" aria-labelledby="formSupprimerFormationTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirmer la Suppression</h4>
                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer cette formation ?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleDeleteFormation}>Supprimer</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formation;
