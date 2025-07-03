import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BaseStyles.css";

function StrategyForm({ projectId }) {
  const [form, setForm] = useState({
    missionCurrent: "", missionNew: "",
    valuesCurrent: "", valuesNew: "", behaviors: "",
    visionLongCurrent: "", visionLongNew: "",
    visionShortCurrent: "", visionShortNew: "",
  });

  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/strategies/${projectId}`);
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error("Error al cargar estrategia:", err.message);
      }
    };
    fetchStrategy();
  }, [projectId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveStrategy = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/strategies/${projectId}`, { projectId, ...form });
      alert("Estrategia guardada ✅");
    } catch (err) {
      console.error("Error al guardar:", err.message);
      alert("Fallo al guardar estrategia ❌");
    }
  };

  return (
    <form onSubmit={saveStrategy} className="strategy-section">
      <h3>Estrategia General</h3>

      <div className="two-column">
        <div>
          <label>Misión Actual</label>
          <textarea name="missionCurrent" value={form.missionCurrent} onChange={handleChange} />
        </div>
        <div>
          <label>Misión Nueva</label>
          <textarea name="missionNew" value={form.missionNew} onChange={handleChange} />
        </div>
      </div>

      <div className="two-column">
        <div>
          <label>Valores Actuales</label>
          <textarea name="valuesCurrent" value={form.valuesCurrent} onChange={handleChange} />
        </div>
        <div>
          <label>Valores Nuevos</label>
          <textarea name="valuesNew" value={form.valuesNew} onChange={handleChange} />
        </div>
      </div>

      <div>
        <label>Comportamientos</label>
        <textarea name="behaviors" value={form.behaviors} onChange={handleChange} />
      </div>

      <div className="two-column">
        <div>
          <label>Visión Largo Plazo (Actual)</label>
          <textarea name="visionLongCurrent" value={form.visionLongCurrent} onChange={handleChange} />
        </div>
        <div>
          <label>Visión Largo Plazo (Nueva)</label>
          <textarea name="visionLongNew" value={form.visionLongNew} onChange={handleChange} />
        </div>
      </div>

      <div className="two-column">
        <div>
          <label>Visión Corto Plazo (Actual)</label>
          <textarea name="visionShortCurrent" value={form.visionShortCurrent} onChange={handleChange} />
        </div>
        <div>
          <label>Visión Corto Plazo (Nueva)</label>
          <textarea name="visionShortNew" value={form.visionShortNew} onChange={handleChange} />
        </div>
      </div>

      <button type="submit">Guardar Estrategia</button>
    </form>
  );
}

export default StrategyForm;


