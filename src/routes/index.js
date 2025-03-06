// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App'; 
import Formation from '../views/Formation';
import Classe from '../views/Classe';
import Ue from '../views/Ue';
import Ec from '../views/Ec';
import MaquetteForm from '../components/Maquette/MaquettForm';
import MaquetteDetails from '../components/Maquette/MaquetteDetails';
import MaquetteList from '../components/Maquette/MaquetteList';
import EnseignementList from '../components/Maquette/EnseignementList';
const RoutesIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Formation" element={<Formation />} />
            <Route path="/Classe" element={<Classe />} />
            <Route path="/Ue" element={<Ue />} />
            <Route path="/Ec" element={<Ec />} />
            <Route path="/liste" element={<MaquetteList />} />
            <Route path="/add" element={<MaquetteForm />} />
            <Route path="/edit/:id" element={<MaquetteForm />} />
            <Route path="/details/:id" element={<MaquetteDetails />} />
            <Route path="/Enseignement" element={<EnseignementList />} />
        </Routes>
    );
};

export default RoutesIndex;


