import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <h3 style={styles.title}>Caltic Planeación Estratégica</h3>
      {user && (
        <div style={styles.links}>
          {user.role === "consultant" && (
            <>
              <Link to="/clients" style={styles.link}>Clientes</Link>
              <Link to="/users" style={styles.link}>Usuarios</Link>
            </>
          )}
          <Link to="/projects" style={styles.link}>Proyectos</Link>
          <button onClick={logout} style={styles.button}>Logout</button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    padding: '1rem',
    background: '#eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
  button: {
    padding: '6px 12px',
    fontSize: '14px',
    cursor: 'pointer'
  }
};

export default Navbar;



