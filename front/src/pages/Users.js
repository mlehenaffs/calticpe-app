import { useState, useEffect } from "react";
import { getUsers, createUser } from "../services/userService";
import "../styles/BaseStyles.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "client" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    setForm({ name: "", email: "", role: "client" });
    loadUsers();
  };

  return (
    <div className="page-container">
      <h2>User Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="client">Client</option>
          <option value="consultant">Consultant</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;

