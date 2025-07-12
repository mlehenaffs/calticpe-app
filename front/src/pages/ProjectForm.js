import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ReactFlowProvider } from "react-flow-renderer";
import MoeBuilder from "./MoeBuilder";
import StrategyForm from "./StrategyForm";
import FodaTab from "./FodaTab";
import CadenaValorTab from "./CadenaValorTab";

function ProjectForm() {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "strategy");

  const renderTabContent = () => {
    switch (activeTab) {
      case "strategy":
        return <StrategyForm projectId={id} />;
      case "moe":
        return (
          <ReactFlowProvider>
            <MoeBuilder projectId={id} />
          </ReactFlowProvider>
        );
      case "foda":
        return <FodaTab projectId={id} />;
      case "cadenaValor":
        return <CadenaValorTab projectId={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <h2>Detalle del Proyecto</h2>

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
        <button
          onClick={() => setActiveTab("foda")}
          className={activeTab === "foda" ? "active-tab" : ""}
        >
          FODA
        </button>
        <button
          onClick={() => setActiveTab("cadenaValor")}
          className={activeTab === "cadenaValor" ? "active-tab" : ""}
        >
          Cadena de Valor
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default ProjectForm;










