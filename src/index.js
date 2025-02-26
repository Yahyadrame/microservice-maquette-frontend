import React from 'react'; // Importation de React pour construire les composants de l'application
import ReactDOM from 'react-dom/client'; // Importation de ReactDOM avec createRoot pour React 18
import './index.css'; // Importation du fichier CSS global
import RoutesIndex from './routes'; // Importation de RoutesIndex, le fichier qui contient les différentes routes de l'application
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation des styles CSS de Bootstrap pour utiliser ses composants et classes
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importation des fichiers JS de Bootstrap pour activer ses fonctionnalités interactives
import { BrowserRouter } from 'react-router-dom'; // Importation de BrowserRouter pour gérer les routes côté client avec React Router

// Création du point de montage avec React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* BrowserRouter enveloppe l'application pour activer la navigation entre les pages */}
    <BrowserRouter>
      {/* RoutesIndex gère la définition et le rendu des différentes routes de l'application */}
      <RoutesIndex />
    </BrowserRouter>
  </React.StrictMode>
);
