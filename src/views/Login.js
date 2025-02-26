import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/HomePage");
      } else {
        const errorMsg = await response.text();
        setError(errorMsg);
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#333",
      fontFamily: "Arial, sans-serif",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#555",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      fontSize: "14px",
    },
    returnButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    returnButton: {
      padding: "10px 20px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Authentification</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Login :</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>
      <div style={styles.returnButtonContainer}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button style={styles.returnButton}>Retourner à l'accueil</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
