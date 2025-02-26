// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App'; 
import Formation from '../views/Formation';
import Classe from '../views/Classe';
import Maquette from '../views/Maquette';
import Ue from '../views/Ue';
import Ec from '../views/Ec';
const RoutesIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Formation" element={<Formation />} />
            <Route path="/Classe" element={<Classe />} />
            <Route path="/Maquette" element={<Maquette />} />
            <Route path="/Ue" element={<Ue />} />
            <Route path="/Ec" element={<Ec />} />
        </Routes>
    );
};

export default RoutesIndex;


