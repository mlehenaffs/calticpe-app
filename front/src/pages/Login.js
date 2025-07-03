import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      login(res.data.user);
      navigate("/projects");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        style={styles.input}
      />
      <div style={styles.buttonWrapper}>
        <button onClick={handleLogin} style={styles.button}>
          Log In
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "250px",
    fontSize: "16px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "8px 24px",
    fontSize: "15px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "auto", // ← esto evita que se expanda a 100%
    display: "inline-block", // ← asegura que no se estire como bloque
  },
};

export default Login;


