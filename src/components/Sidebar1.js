import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileSignature, faBriefcase, faUsers, faHome, faUserGraduate, faCertificate } from '@fortawesome/free-solid-svg-icons'; // Ajout de faCertificate
import { Link } from 'react-router-dom';

const Sidebar1 = () => {
    return (
        <div style={styles.sidebar}>
            <ul style={styles.menu}>
                <li style={styles.menuItem}>
                    <Link to="/" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faHome} style={styles.icon} />
                        Home
                    </Link>
                </li>
                <li style={styles.menuItem}>
                    <Link to="/dossiers" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faFolder} style={styles.icon} />
                        Dossiers
                    </Link>
                </li>
                <li style={styles.menuItem}>
                    <Link to="/convention" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faFileSignature} style={styles.icon} />
                        Convention
                    </Link>
                </li>
                <li style={styles.menuItem}>
                    <Link to="/stage" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faBriefcase} style={styles.icon} />
                        Stage
                    </Link>
                </li>
                <li style={styles.menuItem}>
                    <Link to="/personnels" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faUsers} style={styles.icon} />
                        Personnels
                    </Link>
                </li>
                <li style={styles.menuItem}>
                    <Link to="/stagiaire" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faUserGraduate} style={styles.icon} />
                        Stagiaire
                    </Link>
                </li>
                <li style={styles.menuItem}> {/* Nouvelle section pour Attestation */}
                    <Link to="/attestation" style={styles.menuLink}>
                        <FontAwesomeIcon icon={faCertificate} style={styles.icon} /> {/* Icône Attestation */}
                        Attestation
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        height: '100vh',
        backgroundColor: '#343a40',
        color: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    },
    menu: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    menuItem: {
        margin: '1.5rem 0',
    },
    menuLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    menuLinkHover: {
        backgroundColor: '#495057',
    },
    icon: {
        marginRight: '10px',
        fontSize: '20px',
    },
};

export default Sidebar1;
