import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BaseStyles.css";

function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/clients/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/clients", form);
      }
      setForm({ name: "", contact: "" });
      setEditingId(null);
      fetchClients();
    } catch (error) {
      console.error("Error saving client:", error.message);
    }
  };

  const handleEdit = (client) => {
    setForm({ name: client.name, contact: client.contact });
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="page-container">
      <h2>Clients</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={form.contact}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Client</button>
      </form>

      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            {client.name} - {client.contact}
            <span>
              <button onClick={() => handleEdit(client)}>Edit</button>
              <button onClick={() => handleDelete(client._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;

