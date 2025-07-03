import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ReactFlowProvider } from "react-flow-renderer";
import MoeBuilder from "./MoeBuilder";
import StrategyForm from "./StrategyForm";

function ProjectForm() {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "strategy");

  return (
    <div className="page-container">
      <h2>Detalle del Proyecto</h2>

      {/* Grupo de botones de pestaña */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setActiveTab("strategy")}
          className={activeTab === "strategy" ? "active-tab" : ""}
        >
          Estrategia General
        </button>
        <button
          onClick={() => setActiveTab("moe")}
          className={activeTab === "moe" ? "active-tab" : ""}
        >
          Mapa de Objetivos Estratégicos (MOE)
        </button>
      </div>

      {/* Contenido dinámico */}
      {activeTab === "moe" ? (
        <ReactFlowProvider>
          <MoeBuilder projectId={id} />
        </ReactFlowProvider>
      ) : (
        <StrategyForm projectId={id} />
      )}
    </div>
  );
}

export default ProjectForm;







