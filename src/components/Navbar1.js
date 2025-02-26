import React from 'react';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';  // Importation de l'icône de notification

const Navbar1 = () => {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>Tableau de Bord</h1>
            <div style={styles.navLinks}>
                <Link to="/notifications" style={styles.link}>
                    <FiBell style={styles.icon} /> Notifications
                </Link>
                <Link to="/logout" style={styles.link}>Déconnexion</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        height: '60px',
        backgroundColor: '#007bff',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        position: 'fixed',
        top: 0,
        left: '250px', // Ajusté pour la sidebar
        right: 0,
        zIndex: 1000,
    },
    title: {
        margin: 0,
    },
    navLinks: {
        display: 'flex',
        gap: '1rem',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '8px', // Espacement entre l'icône et le texte
        fontSize: '20px',   // Taille de l'icône
    }
};

export default Navbar1;
