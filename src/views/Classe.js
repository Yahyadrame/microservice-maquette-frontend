import React, { useState, useEffect } from 'react';
import * as classeService from '../services/classeService'; // Importer le service pour gérer les classes
import { Link } from 'react-router-dom';

const Classe = () => {
  const [formations, setFormations] = useState([]); // Liste des formations
  const [classes, setClasses] = useState([]); // Liste des classes
  const [classeData, setClasseData] = useState({ nom: '', annee: '', semestres: '', description: '' }); // Données du formulaire
  const [showModal, setShowModal] = useState(false); // Etat pour la modale d'ajout
  const [showEditModal, setShowEditModal] = useState(false); // Etat pour la modale de modification
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Etat pour la modale de suppression
  const [editingClasse, setEditingClasse] = useState(null); // Classe en cours de modification
  const [deletingClasseId, setDeletingClasseId] = useState(null); // ID de la classe à supprimer
  const [formationId, setFormationId] = useState(null); // ID de la formation sélectionnée
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const classesPerPage = 5; // Nombre de classes par page

  // Charger les formations au chargement du composant
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await classeService.getFormations();
        setFormations(response); // Stocker les formations dans l'état
      } catch (error) {
        console.error("Erreur lors du chargement des formations :", error);
      }
    };

    fetchFormations();
  }, []);

  // Charger les classes en fonction de la formation sélectionnée
  useEffect(() => {
    if (!formationId) return; // Ne rien faire si aucune formation n'est sélectionnée
    const fetchClasses = async () => {
      try {
        const response = await classeService.getClassesByFormationId(formationId);
        setClasses(response); // Stocker les classes associées à la formation sélectionnée
      } catch (error) {
        console.error("Erreur lors du chargement des classes :", error);
      }
    };

    fetchClasses();
  }, [formationId]);

  // Calculer les classes à afficher pour la page actuelle
  const indexOfLastClasse = currentPage * classesPerPage;
  const indexOfFirstClasse = indexOfLastClasse - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClasse, indexOfLastClasse);

  // Gérer la page suivante
  const handleNextPage = () => {
    if (currentPage < Math.ceil(classes.length / classesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Gérer la page précédente
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Gérer l'ajout d'une nouvelle classe
  const handleAddClasse = async (e) => {
    e.preventDefault();
    if (!formationId) {
      console.error("Aucune formation sélectionnée");
      return;
    }

    try {
      const response = await classeService.addClasse({ ...classeData, formationId });
      setClasses([...classes, response]);
      setShowModal(false);
      setClasseData({ nom: '', annee: '', semestres: '', description: '' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la classe :", error);
    }
  };

  // Gérer la modification d'une classe
  const handleEditClasse = async (e) => {
    e.preventDefault();
    if (!editingClasse || !formationId) {
      console.error("Aucune classe à modifier ou formation non sélectionnée");
      return;
    }

    try {
      const response = await classeService.updateClasse(editingClasse.id, { ...classeData, formationId });
      const updatedClasses = classes.map(classe => 
        classe.id === editingClasse.id ? { ...classe, ...response } : classe
      );
      setClasses(updatedClasses);
      setShowEditModal(false);
      setEditingClasse(null);
      setClasseData({ nom: '', annee: '', semestres: '', description: '' });
    } catch (error) {
      console.error("Erreur lors de la modification de la classe :", error);
    }
  };

  // Gérer la suppression d'une classe
  const handleDeleteClasse = async () => {
    if (!deletingClasseId || !formationId) {
      console.error("Aucune classe à supprimer ou formation non sélectionnée");
      return;
    }

    try {
      await classeService.deleteClasse(deletingClasseId);
      setClasses(classes.filter(classe => classe.id !== deletingClasseId));
      setShowDeleteModal(false);
      setDeletingClasseId(null);
    } catch (error) {
      console.error("Erreur lors de la suppression de la classe :", error);
    }
  };

   
  // Fonction pour activer/désactiver une classe
  const handleToggleActiveClasse = async (id) => {
    if (!formationId) {
      console.error("Aucune formation sélectionnée");
      return;
    }
    try {
      await classeService.toggleActiveClasse(id);
      const updatedClasses = classes.map(classe => 
        classe.id === id ? { ...classe, active: !classe.active } : classe
      );
      setClasses(updatedClasses);
    } catch (error) {
      console.error("Erreur lors de l'activation/désactivation de la classe :", error);
    }
  };

  // Fonction pour archiver/désarchiver une classe
  const handleToggleArchivedClasse = async (id) => {
    if (!formationId) {
      console.error("Aucune formation sélectionnée");
      return;
    }
    try {
      await classeService.toggleArchivedClasse(id);
      const updatedClasses = classes.map(classe => 
        classe.id === id ? { ...classe, archived: !classe.archived } : classe
      );
      setClasses(updatedClasses);
    } catch (error) {
      console.error("Erreur lors de l'archivage/désarchivage de la classe :", error);
    }
  };
     // Fonction pour afficher les informations dans le formulaire de modification
  const handleEditClick = (classe) => {
    setEditingClasse(classe);
    setClasseData({
      nom: classe.nom,
      annee: classe.annee,
      semestres: classe.semestres,
      description: classe.description,
    });
    setShowEditModal(true);
  };

     // Fonction pour afficher la modale de suppression
  const handleDeleteClick = (id) => {
    setDeletingClasseId(id);
    setShowDeleteModal(true);
  };

  // Gérer la sélection de la formation
  const handleFormationSelect = (event) => {
    setFormationId(event.target.value); // Sélectionner l'ID de la formation
  };

  return (
    <div className="container">
      <h3 className="text-center mt-4">Liste des Classes</h3>

      {/* Sélectionner une formation */}
      <div className="form-group">
        <label htmlFor="formationSelect">Sélectionner une Formation</label>
        <select className="form-control" id="formationSelect" onChange={handleFormationSelect} value={formationId || ''}>
          <option value="">Choisir une formation</option>
          {formations.map(formation => (
            <option key={formation.id} value={formation.id}>{formation.nom}</option>
          ))}
        </select>
      </div>

      {/* Ajouter Classe si une formation est sélectionnée */}
      {formationId && (
        <button className="btn btn-success" onClick={() => setShowModal(true)}>Ajouter Classe</button>
      )}

      {/* Liste des Classes */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Année</th>
              <th>Semestres</th>
              <th>Description</th>
              <th>Actif</th>
              <th>Archivé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClasses.map((classe) => (
              <tr key={classe.id}>
                <td>{classe.nom}</td>
                <td>{classe.annee}</td>
                <td>{classe.semestres}</td>
                <td>{classe.description}</td>
                <td>
                  <button
                    className={`btn btn-${classe.active ? 'success' : 'secondary'} btn-sm`}
                    onClick={() => handleToggleActiveClasse(classe.id)}
                  >
                    {classe.active ? 'Désactiver' : 'Activer'}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-${classe.archived ? 'warning' : 'secondary'} btn-sm`}
                    onClick={() => handleToggleArchivedClasse(classe.id)}
                  >
                    {classe.archived ? 'Désarchiver' : 'Archiver'}
                  </button>
                </td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => handleEditClick(classe)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(classe.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
          <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage === Math.ceil(classes.length / classesPerPage)}>Suivant</button>
        </div>
      </div>

      {/* Lien pour retourner à l'accueil */}
      <div className='container'>
        <Link to="/" className="btn btn-primary mt-3">
          Retourner à l'accueil
        </Link>
      </div>

      {/* Modales */}
      {/* Modale pour ajouter une classe */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Ajouter_Classe" role="dialog" aria-labelledby="formAjouterClasseTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Ajouter une Classe</h4>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleAddClasse}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" value={classeData.nom} onChange={(e) => setClasseData({ ...classeData, nom: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Année</label>
                    <input type="text" className="form-control" value={classeData.annee} onChange={(e) => setClasseData({ ...classeData, annee: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Semestres</label>
                    <input type="text" className="form-control" value={classeData.semestres} onChange={(e) => setClasseData({ ...classeData, semestres: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={classeData.description} onChange={(e) => setClasseData({ ...classeData, description: e.target.value })}></textarea>
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

       {/* Modale pour modifier une classe */}
       {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Modifier_Classe" role="dialog" aria-labelledby="formModifierClasseTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modifier la Classe</h4>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleEditClasse}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" value={classeData.nom} onChange={(e) => setClasseData({ ...classeData, nom: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Année</label>
                    <input type="text" className="form-control" value={classeData.annee} onChange={(e) => setClasseData({ ...classeData, annee: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Semestres</label>
                    <input type="text" className="form-control" value={classeData.semestres} onChange={(e) => setClasseData({ ...classeData, semestres: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={classeData.description} onChange={(e) => setClasseData({ ...classeData, description: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Sauvegarder</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Fermer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Modale pour supprimer une classe */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="form_Supprimer_Classe" role="dialog" aria-labelledby="formSupprimerClasseTitle" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Supprimer une Classe</h4>
                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer cette classe ?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleDeleteClasse}>Supprimer</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classe;
