import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/BaseStyles.css";

function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    accessUsers: [],
  });
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filterClient, setFilterClient] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("http://localhost:5000/api/projects");
      const allProjects = res.data;
      const visibleProjects = allProjects.filter((proj) =>
        proj.accessUsers.some((u) => (typeof u === "object" ? u._id : u) === user._id)
      );
      setProjects(visibleProjects);
    };

    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    };

    const fetchClients = async () => {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    };

    fetchProjects();
    fetchUsers();
    fetchClients();
  }, [user._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, newProject);
      } else {
        await axios.post("http://localhost:5000/api/projects", newProject);
      }
      const res = await axios.get("http://localhost:5000/api/projects");
      const allProjects = res.data;
      const visibleProjects = allProjects.filter((proj) =>
        proj.accessUsers.some((u) => (typeof u === "object" ? u._id : u) === user._id)
      );
      setProjects(visibleProjects);
      setNewProject({ name: "", client: "", accessUsers: [] });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving project:", error.message);
    }
  };

  const handleEdit = (project) => {
    setNewProject({
      name: project.name || "",
      client: project.client?._id || project.client || "",
      accessUsers: (project.accessUsers || []).map((u) => u._id || u),
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      const res = await axios.get("http://localhost:5000/api/projects");
      const allProjects = res.data;
      const visibleProjects = allProjects.filter((proj) =>
        proj.accessUsers.some((u) => (typeof u === "object" ? u._id : u) === user._id)
      );
      setProjects(visibleProjects);
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  };

  const filteredProjects = filterClient
    ? projects.filter((p) => p.client?._id === filterClient || p.client === filterClient)
    : projects;

  return (
    <div className="page-container">
      <h2>Proyectos</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del Proyecto"
          value={newProject.name}
          onChange={handleChange}
          required
        />
        <select
          name="client"
          value={newProject.client}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona Cliente</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <Select
          isMulti
          name="accessUsers"
          options={users.map((user) => ({
            value: user._id,
            label: user.name,
          }))}
          value={users
            .filter((user) => newProject.accessUsers.includes(user._id))
            .map((user) => ({ value: user._id, label: user.name }))}
          onChange={(selectedOptions) => {
            setNewProject((prev) => ({
              ...prev,
              accessUsers: selectedOptions.map((opt) => opt.value),
            }));
          }}
        />

        <button type="submit">{editingId ? "Actualizar" : "Agregar"} Proyecto</button>
      </form>

      <div style={{ marginBottom: "20px" }}>
        <label>Filtrar por Cliente: </label>
        <select
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        >
          <option value="">Todos</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredProjects.map((proj) => (
          <li key={proj._id}>
            <div>
              <strong>{proj.name}</strong> — Cliente: {proj.client?.name}
              <br />
              <small>
                Usuarios con acceso:{" "}
                {proj.accessUsers?.length
                  ? proj.accessUsers.map((u) => u.name || u).join(", ")
                  : "Ninguno"}
              </small>
            </div>
            <span style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button onClick={() => handleEdit(proj)}>Editar</button>
              <button onClick={() => handleDelete(proj._id)}>Eliminar</button>
              <Link to={`/projects/${proj._id}`} state={{ tab: "strategy" }}>
                <button style={{ backgroundColor: "#673ab7", color: "#fff" }}>
                  Ver
                </button>
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;



