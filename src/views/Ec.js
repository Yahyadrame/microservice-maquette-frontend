import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ec = () => {
  const [ues, setUes] = useState([]);  // Liste des UEs
  const [ecs, setEcs] = useState([]);  // Liste des ECs pour l'UE sélectionnée
  const [selectedUe, setSelectedUe] = useState(null); // UE sélectionnée
  const [newEc, setNewEc] = useState({ code: '', libelle: '', cm: '', td: '', tp: '', tpe: '', vh: '', coefficient: '' });  // Détails du nouvel EC
  const [showForm, setShowForm] = useState(false);  // Contrôle d'affichage du formulaire

  // Récupération des UEs depuis l'API
  useEffect(() => {
    axios.get('http://localhost:8080/api/ues')
      .then(response => {
        setUes(response.data);
      })
      .catch(error => console.error('Erreur lors de la récupération des UEs:', error));
  }, []);

  // Récupération des ECs pour l'UE sélectionnée
  const fetchEcs = (ueId) => {
    axios.get(`http://localhost:8080/api/ecs/ue/${ueId}`)
      .then(response => {
        setEcs(response.data);
      })
      .catch(error => console.error('Erreur lors de la récupération des ECs:', error));
  };

  // Gérer la sélection d'une UE
  const handleUeSelect = (event) => {
    const selectedUeId = event.target.value;
    if (!selectedUeId) return;  // Si rien n'est sélectionné, ne pas faire d'action
    const selectedUe = ues.find(ue => ue.id === parseInt(selectedUeId));  // Trouver l'UE correspondante par ID
    setSelectedUe(selectedUe);  // Mettre à jour l'UE sélectionnée
    fetchEcs(selectedUeId);  // Récupérer les ECs pour cette UE
  };

  // Gérer l'ajout d'un nouvel EC
  const handleAddEc = () => {
    if (!newEc.code || !newEc.libelle) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Vérifier si selectedUe est bien défini avant de faire l'appel à l'API
    if (!selectedUe || !selectedUe.id) {
      alert('Aucune UE sélectionnée.');
      return;
    }

    // Convertir les champs numériques en entiers ou utiliser 0 si non valide
    const newEcData = {
      ...newEc,
      cm: isNaN(Number(newEc.cm)) ? 0 : Number(newEc.cm),
      td: isNaN(Number(newEc.td)) ? 0 : Number(newEc.td),
      tp: isNaN(Number(newEc.tp)) ? 0 : Number(newEc.tp),
      tpe: isNaN(Number(newEc.tpe)) ? 0 : Number(newEc.tpe),
      vh: isNaN(Number(newEc.vh)) ? 0 : Number(newEc.vh),
      coefficient: isNaN(Number(newEc.coefficient)) ? 0 : Number(newEc.coefficient),
    };

    // Effectuer l'appel API
    axios.post(`http://localhost:8080/api/ecs/ue/${selectedUe.id}`, newEcData)
      .then(response => {
        // Mettre à jour la liste des ECs avec la nouvelle donnée
        setEcs([...ecs, response.data]);
        // Réinitialiser le formulaire
        setNewEc({ code: '', libelle: '', cm: '', td: '', tp: '', tpe: '', vh: '', coefficient: '' });
        setShowForm(false); // Cacher le formulaire après l'ajout
      })
      .catch(error => {
        // Afficher l'erreur détaillée
        console.error("Une erreur est survenue :", error.response ? error.response.data : error.message);
      });
  };

  // Calculer le total de td + tp + cm pour un EC
  const calculateTotal = (ec) => {
    return (parseFloat(ec.td) || 0) + (parseFloat(ec.tp) || 0) + (parseFloat(ec.cm) || 0);
  };

  // Gérer les actions sur les ECs
  const handleDelete = (ecId) => {
    axios.delete(`http://localhost:8080/api/ecs/${ecId}`)
      .then(() => {
        setEcs(ecs.filter(ec => ec.id !== ecId)); // Mettre à jour la liste des ECs
      })
      .catch(error => console.error('Erreur lors de la suppression de l\'EC:', error));
  };

  const handleActivate = (ecId) => {
    axios.put(`http://localhost:8080/api/ecs/activate/${ecId}`)
      .then(() => {
        alert('EC activé');
        // Mettre à jour la liste des ECs après activation (ici vous pouvez peut-être changer un champ ou recharger les ECs)
      })
      .catch(error => console.error('Erreur lors de l\'activation de l\'EC:', error));
  };

  const handleArchive = (ecId) => {
    axios.put(`http://localhost:8080/api/ecs/archive/${ecId}`)
      .then(() => {
        alert('EC archivé');
        // Mettre à jour la liste des ECs après archivage
      })
      .catch(error => console.error('Erreur lors de l\'archivage de l\'EC:', error));
  };

  return (
    <div className="container mt-4">
      {/* Liste déroulante pour sélectionner une UE */}
      <h2>Sélectionner une UE</h2>
      <select className="form-select" onChange={handleUeSelect} value={selectedUe ? selectedUe.id : ''}>
        <option value="">Choisir une UE</option>
        {ues.map((ue) => (
          <option key={ue.id} value={ue.id}>
            {ue.code} {/* Afficher le code de l'UE */}
          </option>
        ))}
      </select>

      {/* Afficher l'UE sélectionnée */}
      {selectedUe && (
        <div>
          <h3>ECs pour l'UE : {selectedUe.code}</h3> {/* Afficher le code de l'UE sélectionnée */}

          {/* Bouton pour afficher/masquer le formulaire d'ajout */}
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Annuler' : 'Ajouter un EC'}
          </button>

          {/* Formulaire pour ajouter un nouvel EC */}
          {showForm && (
            <div className="mt-3">
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Code de l'EC"
                value={newEc.code}
                onChange={(e) => setNewEc({ ...newEc, code: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Libellé de l'EC"
                value={newEc.libelle}
                onChange={(e) => setNewEc({ ...newEc, libelle: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="CM"
                value={newEc.cm}
                onChange={(e) => setNewEc({ ...newEc, cm: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="TD"
                value={newEc.td}
                onChange={(e) => setNewEc({ ...newEc, td: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="TP"
                value={newEc.tp}
                onChange={(e) => setNewEc({ ...newEc, tp: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="TPE"
                value={newEc.tpe}
                onChange={(e) => setNewEc({ ...newEc, tpe: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="VH"
                value={newEc.vh}
                onChange={(e) => setNewEc({ ...newEc, vh: e.target.value })}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="Coefficient"
                value={newEc.coefficient}
                onChange={(e) => setNewEc({ ...newEc, coefficient: e.target.value })}
              />
              <button className="btn btn-success" onClick={handleAddEc}>Ajouter EC</button>
            </div>
          )}

          {/* Liste des ECs pour l'UE sélectionnée */}
          <h4 className="mt-4">Liste des ECs</h4>
          <table className="table table-striped">
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
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ecs.map((ec) => (
                <tr key={ec.id}>
                  <td>{ec.code}</td>
                  <td>{ec.libelle}</td>
                  <td>{ec.cm}</td>
                  <td>{ec.td}</td>
                  <td>{ec.tp}</td>
                  <td>{ec.tpe}</td>
                  <td>{ec.vh}</td>
                  <td>{ec.coefficient}</td>
                  <td>{calculateTotal(ec)}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(ec.id)}>Supprimer</button>
                    <button className="btn btn-warning ml-2" onClick={() => handleActivate(ec.id)}>
                      {ec.active ? 'Désactiver' : 'Activer'}
                    </button>
                    <button className="btn btn-info ml-2" onClick={() => handleArchive(ec.id)}>
                      {ec.archive ? 'Désarchiver' : 'Archiver'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Ec;
