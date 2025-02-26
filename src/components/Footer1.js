import React from 'react';

const Footer1 = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2025 Université Assane Seck de Ziguinchor. Tous droits réservés.</p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#343a40',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem 0',
        position: 'fixed',
        bottom: 0,
        left: '250px', // Ajusté pour la sidebar
        right: 0,
    },
};

export default Footer1;
