import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EnseignementList = () => {
  const [enseignements, setEnseignements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Nombre d'éléments par page
  const [totalPages, setTotalPages] = useState(1);

  // Fonction pour récupérer les enseignements
  useEffect(() => {
    fetchEnseignements();
  }, [currentPage]);

  const fetchEnseignements = async () => {
    try {
      console.log("Fetching enseignements...");
      const response = await axios.get("http://localhost:8080/api/enseignements");
      const data = response.data;
      
      setEnseignements(Array.isArray(data) ? data : []);
      setTotalPages(Math.ceil(data.length / pageSize)); // Calcul du nombre total de pages
    } catch (error) {
      console.error("Erreur lors de la récupération des enseignements", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Liste des Enseignements</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>EC ID</th> {/* Afficher l'ID de EC */}
            <th>Type</th>
            <th>Classe ID</th> {/* Afficher l'ID de Classe */}
            <th>Semestre</th>
            <th>Formation ID</th> {/* Afficher l'ID de Formation */}
          </tr>
        </thead>
        <tbody>
          {getPagedEnseignements().map((enseignement) => (
            <tr key={enseignement.id}>
              <td>{enseignement.id}</td>
              <td>{enseignement.ecId ?? "Non défini"}</td> {/* Affichage de l'ID EC */}
              <td>{enseignement.type}</td>
              <td>{enseignement.classeId ?? "Non défini"}</td> {/* Affichage de l'ID Classe */}
              <td>{enseignement.semestres ?? "N/A"}</td>
              <td>{enseignement.formationId ?? "Non défini"}</td> {/* Affichage de l'ID Formation */}
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
