import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { addEdge, Background, Controls } from "react-flow-renderer";
import axios from "axios";
import "../styles/BaseStyles.css";
import "react-flow-renderer/dist/style.css";

function MoeBuilder({ projectId }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [moeId, setMoeId] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) =>
      nds.map((node) => {
        const change = changes.find((c) => c.id === node.id);
        return change ? { ...node, ...change } : node;
      })
    );
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) =>
      eds.map((edge) => {
        const change = changes.find((c) => c.id === edge.id);
        return change ? { ...edge, ...change } : edge;
      })
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/moes/${projectId}`);
        console.log("Respuesta del backend:", res.data);

        const existingMoe = res.data.find((moe) =>
          typeof moe.projectId === "string"
            ? moe.projectId === projectId
            : moe.projectId._id === projectId
        );

        if (existingMoe) {
          console.log("MOE encontrado:", existingMoe._id);
          if (!isMounted) return;
          setMoeId(existingMoe._id);

          const nodeList = existingMoe.elements.map((el) => ({
            id: el.id,
            data: { label: el.label },
            position: el.position || { x: 100, y: 100 },
            type: "default",
          }));

          const edgeList = [];
          existingMoe.elements.forEach((el) => {
            el.connections.forEach((c) =>
              edgeList.push({
                id: `${el.id}-${c}`,
                source: el.id,
                target: c,
              })
            );
          });

          setNodes(nodeList);
          setEdges(edgeList);
        } else {
          const newMoeRes = await axios.post("http://localhost:5000/api/moes", {
            projectId,
            elements: [],
          });
          if (!isMounted) return;
          console.log("Nuevo MOE creado:", newMoeRes.data._id);
          setMoeId(newMoeRes.data._id);
          setNodes([]);
          setEdges([]);
        }
      } catch (err) {
        console.error("Error al cargar el MOE:", err.message);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const saveMoe = async () => {
    if (!moeId) {
      alert("Espere a que se cree el MOE");
      return;
    }

    const elements = nodes.map((n) => ({
      id: n.id,
      label: n.data.label,
      position: n.position,
      connections: edges
        .filter((e) => e.source === n.id)
        .map((e) => e.target),
    }));

    try {
      await axios.put(`http://localhost:5000/api/moes/${moeId}`, {
        projectId,
        elements,
      });
      alert("Mapa guardado ✅");
    } catch (err) {
      console.error("Error guardando MOE:", err.message);
      alert("No se pudo guardar el MOE ❌");
    }
  };

  const addNode = () => {
    const newId = Date.now().toString();
    setNodes((nds) => [
      ...nds,
      {
        id: newId,
        type: "default",
        data: { label: `Objetivo ${nds.length + 1}` },
        position: { x: Math.random() * 250, y: Math.random() * 250 },
      },
    ]);
  };

  return (
    <div className="page-container">
      <h2>Mapa de Objetivos Estratégicos</h2>
      <button className="moe-add-button" onClick={addNode}>
        Añadir Objetivo
      </button>
      <button style={{ marginLeft: "10px" }} onClick={saveMoe}>
        Guardar MOE
      </button>
      <div className="moe-container" style={{ height: "500px", marginTop: "20px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default MoeBuilder;


