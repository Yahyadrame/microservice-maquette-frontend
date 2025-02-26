import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf, faTimesCircle, faUser, faUserGraduate, faFolder } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    return (
        <div style={styles.dashboard}>
            <Sidebar />
            <Navbar1 />
            <main style={styles.content}>
                <h2 style={styles.heading}>Vue d'ensemble des Stages</h2>
                <div style={styles.cardsContainer}>
                    {/* Carte 1 : Stage Terminé */}
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ ...styles.icon, color: 'green' }} />
                        <h3>Stage Terminé</h3>
                        <p>45 stages terminés avec succès cette année.</p>
                    </div>

                    {/* Carte 2 : Stage en Cours */}
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faHourglassHalf} style={{ ...styles.icon, color: 'orange' }} />
                        <h3>Stage en Cours</h3>
                        <p>18 stages en cours de réalisation.</p>
                    </div>

                    {/* Carte 3 : Stage Non Terminé */}
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ ...styles.icon, color: 'red' }} />
                        <h3>12 Stage Non Terminé</h3>
                        <p>Stages partiellement complétés ou nécessitant des efforts supplémentaires pour aboutir.</p>
                    </div>

                    {/* Carte 4 : Stage Personnel */}
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faFolder} style={{ ...styles.icon, color: '#28a745' }} />
                        <FontAwesomeIcon icon={faUserGraduate} style={{ ...styles.icon, color: '#6f42c1' }} />
                        <FontAwesomeIcon icon={faUser} style={{ ...styles.icon, color: '#007bff' }} />
                        <p>Gestion des informations personnelles et de la progression des stagiaires.</p>
                    </div>

                    {/* Carte 5 : Stagiaire */}
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faFolder} style={{ ...styles.icon, color: '#28a745' }} />
                        <FontAwesomeIcon icon={faUserGraduate} style={{ ...styles.icon, color: '#6f42c1' }} />
                        <FontAwesomeIcon icon={faUser} style={{ ...styles.icon, color: '#007bff' }} />
                        <p>Suivi et gestion des stagiaires dans divers domaines.</p>
                    </div>

                    {/* Carte 6 : Dossier Combiné */}
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faFolder} style={{ ...styles.icon, color: '#28a745' }} />
                        <FontAwesomeIcon icon={faUserGraduate} style={{ ...styles.icon, color: '#6f42c1' }} />
                        <FontAwesomeIcon icon={faUser} style={{ ...styles.icon, color: '#007bff' }} />
                        <p>Gestion combinée des dossiers de stage pour une vue d'ensemble complète.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const styles = {
    dashboard: {
        display: 'flex',
    },
    content: {
        marginLeft: '250px', // Ajusté pour la sidebar
        marginTop: '60px',   // Ajusté pour la navbar
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: 'calc(100vh - 60px)', // Hauteur ajustée pour inclure le footer
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#343a40',
    },
    cardsContainer: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '2rem',
    },
    card: {
        backgroundColor: '#fff',
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: 'calc(33.333% - 1rem)', // Trois colonnes avec même taille pour toutes les cartes
        textAlign: 'center',
    },
    icon: {
        fontSize: '2rem', // Assurez-vous que toutes les icônes sont à la même taille
        marginBottom: '0.5rem',
    },
};

export default Dashboard;
