import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer style={styles.footer} className="text-white text-center">
      <div className="container">
        <p style={styles.copyRight}>&copy; 2024 Université Assane SECK. Tous droits réservés.</p>
        <div className="social-icons" style={styles.socialIcons}>
          <a href="https://wa.me/123456789" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp fa-2x"></i>
          </a>
          <a href="https://www.facebook.com/monapplication" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook fa-2x"></i>
          </a>
          <a href="https://twitter.com/monapplication" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/monapplication" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram fa-2x"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#00B4D8', // Couleur uniforme avec la navbar
    padding: '10px 0', // Réduit l'épaisseur
  },
  copyRight: {
    margin: '5px 0',
    fontSize: '14px',
  },
  socialIcons: {
    marginTop: '5px',
  },
};

export default Footer;
