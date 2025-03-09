import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EnseignementList = () => {
  const [enseignements, setEnseignements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true); // État pour le chargement des classes
  const [classes, setClasses] = useState([]); // Liste des classes
  const [selectedClasseId, setSelectedClasseId] = useState(""); // ID de la classe sélectionnée
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Nombre d'éléments par page
  const [totalPages, setTotalPages] = useState(1);

  // Fonction pour récupérer toutes les classes
  const fetchClasses = async () => {
    try {
      setLoadingClasses(true); // Mettre l'état en chargement avant la requête
      const response = await axios.get("http://localhost:8080/api/classes");
      console.log("Classes récupérées : ", response.data); // Vérifiez la réponse de l'API
      setClasses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des classes", error);
    } finally {
      setLoadingClasses(false); // Fin du chargement des classes
    }
  };

  // Fonction pour récupérer les enseignements par ID de la classe
  const fetchEnseignementsByClasse = async (classeId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/enseignements/classe/${classeId}`);
      const data = response.data;
      setEnseignements(Array.isArray(data) ? data : []);
      setTotalPages(Math.ceil(data.length / pageSize)); // Calcul du nombre total de pages
    } catch (error) {
      console.error("Erreur lors de la récupération des enseignements", error);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les classes au montage du composant
  useEffect(() => {
    fetchClasses();
  }, []);

  // Récupérer les enseignements lorsque la classe sélectionnée change
  useEffect(() => {
    if (selectedClasseId) {
      fetchEnseignementsByClasse(selectedClasseId);
    }
  }, [selectedClasseId, currentPage]);

  // Obtenir les éléments paginés
  const getPagedEnseignements = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return enseignements.slice(startIndex, startIndex + pageSize);
  };

  // Gestion de la pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Liste des Enseignements</h2>

      {/* Sélecteur de classe */}
      <div className="mb-4">
        <label htmlFor="classeSelect" className="form-label">Sélectionner une classe</label>
        <select
          id="classeSelect"
          className="form-select"
          value={selectedClasseId}
          onChange={(e) => setSelectedClasseId(e.target.value)}
        >
          <option value="">Choisir une classe</option>
          {loadingClasses ? (
            <option>Chargement des classes...</option> // Vous pouvez simplement afficher cela pendant que les classes sont chargées
          ) : (
            classes.length > 0 ? (
              classes.map((classe) => (
                <option key={classe.id} value={classe.id}>
                  {classe.nom} {/* Affichez le nom ou toute autre propriété de la classe */}
                </option>
              ))
            ) : (
              <option>Aucune classe disponible</option> // Affichage si aucune classe n'est disponible
            )
          )}
        </select>
      </div>

      {/* Affichage des enseignements */}
      {selectedClasseId && (
        <>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>EC</th>
                <th>Type</th>
                <th>Semestre</th>
                <th>Formation</th>
              </tr>
            </thead>
            <tbody>
              {/* en cas de besoin classeNom */}
              {getPagedEnseignements().map((enseignement) => (
                <tr key={enseignement.id}>
                  <td>{enseignement.ecLibelle ?? "Non défini"}</td>
                  <td>{enseignement.type}</td>
                  <td>{enseignement.semestres ?? "N/A"}</td>
                  <td>{enseignement.formationNom ?? "Non défini"}</td>
                </tr>
              ))}
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
        </>
      )}

      {/* Bouton de retour */}
      <div className="container">
        <Link to="/" className="btn btn-primary mt-3">
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default EnseignementList;
