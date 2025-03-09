import React from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChalkboard, faBook, faUserGraduate, faListAlt } from '@fortawesome/free-solid-svg-icons'; // Icônes ajoutées
import logo from '../assets/Logo_uasz-bg-white.jpg'; // Remplacer avec votre chemin d'image

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid" style={styles.containerFluid}>
        <div className="navbar-brand" style={styles.brand}>
          <img src={logo} alt="Logo" style={styles.logo} />
          Université Assane SECK
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav" style={styles.navItems}> 
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/Formation" style={styles.navLink}>
                <FontAwesomeIcon icon={faUserGraduate} style={styles.icon} /> Formation
              </Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/Classe" style={styles.navLink}>
                <FontAwesomeIcon icon={faChalkboard} style={styles.icon} /> Classe
              </Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/liste" style={styles.navLink}>
                <FontAwesomeIcon icon={faListAlt} style={styles.icon} /> Maquettes
              </Link>
            </li>
            <li className="nav-item dropdown" style={styles.navItem}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={styles.navLink}
              >
                <FontAwesomeIcon icon={faBook} style={styles.icon} /> UE
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/Ue" style={styles.dropdownItem}>
                    Gestion UE
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Ec" style={styles.dropdownItem}>
                    Les Ecs
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#00B4D8', // Même couleur que le footer
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    padding: '8px 20px', 
    position: 'sticky',
    top: 0,
    zIndex: 1000, 
  },
  containerFluid: {
    paddingLeft: '30px', 
    paddingRight: '30px', 
    maxWidth: '100%', 
  },
  logo: {
    height: '50px', 
    width: 'auto',
    marginRight: '15px',
    objectFit: 'contain',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '8px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center', 
  },
  navItems: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%', 
    flexWrap: 'wrap', 
  },
  navItem: {
    margin: '0 10px', 
  },
  navLink: {
    color: '#fff',
    fontWeight: '500',
    transition: 'color 0.3s ease', 
    padding: '8px 15px', 
    display: 'flex',
    alignItems: 'center', 
  },
  icon: {
    marginRight: '8px',
  },
  dropdownItem: {
    color: '#333',
  },
};

export default Navbar;
