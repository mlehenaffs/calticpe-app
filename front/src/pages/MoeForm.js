import React, { useState } from "react";
import "../styles/BaseStyles.css";

function MoeForm() {
  const [name, setName] = useState("");
  const [objectives, setObjectives] = useState([{ id: Date.now(), text: "" }]);

  const handleAddObjective = () => {
    setObjectives([...objectives, { id: Date.now(), text: "" }]);
  };

  const handleChangeObjective = (id, value) => {
    setObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, text: value } : obj))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nombre del MOE:", name);
    console.log("Objetivos:", objectives);
    // Aquí se podría enviar a la API más adelante
  };

  return (
    <div className="page-container">
      <h2>Crear Mapa de Objetivos Estratégicos (MOE)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del MOE"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <h4>Objetivos Estratégicos</h4>
        {objectives.map((obj) => (
          <input
            key={obj.id}
            type="text"
            placeholder="Escribe un objetivo"
            value={obj.text}
            onChange={(e) => handleChangeObjective(obj.id, e.target.value)}
            required
          />
        ))}

        <button type="button" onClick={handleAddObjective}>
          Agregar Objetivo
        </button>
        <button type="submit">Guardar MOE</button>
      </form>
    </div>
  );
}

export default MoeForm;
