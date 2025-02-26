import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faClipboardList, faChalkboardTeacher, faUniversity, faWrench } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
    return (
        <div>
            <Navbar />
            <main style={styles.main}>
                <section style={styles.heroSection}>
                    <div style={styles.heroText}>
                        <h1 style={styles.title}>Gestion de la Maquette de Formation</h1>
                        <p style={styles.subtitle}>Gérez les maquettes, les classes, les formations, les UE et les EC pour une organisation optimale des cursus.</p>
                    </div>
                </section>

                <section style={styles.cardsSection}>
                    <h2 style={styles.sectionTitle}>Options de Gestion</h2>
                    <div style={styles.cardContainer}>
                        <div style={styles.card}>
                            <FontAwesomeIcon 
                                icon={faGraduationCap} 
                                style={styles.cardIcon}
                            />
                            <h3 style={styles.cardTitle}>Maquette</h3>
                            <p style={styles.cardText}>Créez et gérez les maquettes de formation pour les étudiants.</p>
                            <Link to="/Maquette" style={styles.link}>Accéder</Link>
                        </div>
                        <div style={styles.card}>
                            <FontAwesomeIcon 
                                icon={faClipboardList} 
                                style={styles.cardIcon}
                            />
                            <h3 style={styles.cardTitle}>Classes</h3>
                            <p style={styles.cardText}>Organisez et gérez les classes et groupes d'étudiants.</p>
                            <Link to="/Classe" style={styles.link}>Accéder</Link>
                        </div>
                        <div style={styles.card}>
                            <FontAwesomeIcon 
                                icon={faChalkboardTeacher} 
                                style={styles.cardIcon}
                            />
                            <h3 style={styles.cardTitle}>Formations</h3>
                            <p style={styles.cardText}>Configurez et gérez les formations proposées par l'université.</p>
                            <Link to="/Formation" style={styles.link}>Accéder</Link>
                        </div>
                        <div style={styles.card}>
                            <FontAwesomeIcon 
                                icon={faUniversity} 
                                style={styles.cardIcon}
                            />
                            <h3 style={styles.cardTitle}>Unité d'Enseignement (UE)</h3>
                            <p style={styles.cardText}>Gérez les différentes unités d'enseignement pour chaque formation.</p>
                            <Link to="/Ue" style={styles.link}>Accéder</Link>
                        </div>
                        <div style={styles.card}>
                            <FontAwesomeIcon 
                                icon={faWrench} 
                                style={styles.cardIcon}
                            />
                            <h3 style={styles.cardTitle}>Élément Constitutif (EC)</h3>
                            <p style={styles.cardText}>Ajoutez et gérez les éléments constitutifs des UE.</p>
                            <Link to="/Ec" style={styles.link}>Accéder</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

const styles = {
    main: {
        padding: '2rem',
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#f5f5f5',
    },
    heroSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #6a7dff, #acb6e5)', // Dégradé pastel bleu
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
    heroText: {
        textAlign: 'center',
        maxWidth: '80%',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontWeight: 'lighter',
    },
    cardsSection: {
        textAlign: 'center',
        marginTop: '3rem',
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '2rem',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Grille responsive
        gap: '2rem',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        textAlign: 'center',
        background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
        cursor: 'pointer',
    },
    cardIcon: {
        fontSize: '70px',
        marginBottom: '1rem',
        color: '#00B4D8',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: '#333',
    },
    cardText: {
        fontSize: '1rem',
        color: '#777',
        marginBottom: '1.5rem',
    },
    link: {
        textDecoration: 'none',
        color: '#0099CC',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        border: '2px solid #0099CC',
        transition: 'background-color 0.3s, color 0.3s',
    },
    linkHover: {
        backgroundColor: '#0099CC',
        color: 'white',
    },
    cardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
    },
};

export default App;
