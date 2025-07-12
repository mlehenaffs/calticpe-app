import React, { useEffect, useState } from "react";
import axios from "axios";

function CadenaValorTab({ projectId }) {
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cadena-valor/${projectId}`)
      .then((res) => {
        setProcesos(res.data || []);
      })
      .catch((err) => {
        console.error("Error al cargar procesos:", err);
      });
  }, [projectId]);

  const handleChange = (index, campo, valor) => {
    const nuevosProcesos = [...procesos];
    nuevosProcesos[index][campo] = valor;
    setProcesos(nuevosProcesos);
  };

  const agregarProceso = () => {
    setProcesos([
      ...procesos,
      {
        nombre: "",
        prioridad: "",
        inicio: "",
        fin: "",
        responsable: "",
        subprocesos: "",
        input: "",
        output: "",
        observaciones: "",
      },
    ]);
  };

  const guardarProcesos = async () => {
    try {
      for (const proceso of procesos) {
        const { _id, ...procesoSinId } = proceso; // quitar _id si existe
        await axios.post("http://localhost:5000/api/cadena-valor", {
          ...procesoSinId,
          proyectoId: projectId,
        });
      }
      alert("Procesos guardados correctamente.");
    } catch (err) {
      console.error("Error al guardar procesos:", err);
      alert("Error al guardar.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Cadena de Valor - Procesos Internos</h2>

      <button
        onClick={agregarProceso}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Agregar Proceso
      </button>

      <div className="space-y-6">
        {procesos.map((p, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-xl p-4 shadow-sm space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={p.nombre || ""}
                onChange={(e) => handleChange(idx, "nombre", e.target.value)}
                placeholder="Nombre del proceso"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.prioridad || ""}
                onChange={(e) => handleChange(idx, "prioridad", e.target.value)}
                placeholder="Prioridad / Impacto financiero"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.responsable || ""}
                onChange={(e) => handleChange(idx, "responsable", e.target.value)}
                placeholder="Responsable principal"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.inicio || ""}
                onChange={(e) => handleChange(idx, "inicio", e.target.value)}
                placeholder="Inicio del proceso"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.fin || ""}
                onChange={(e) => handleChange(idx, "fin", e.target.value)}
                placeholder="Fin del proceso"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.subprocesos || ""}
                onChange={(e) => handleChange(idx, "subprocesos", e.target.value)}
                placeholder="Subprocesos importantes"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.input || ""}
                onChange={(e) => handleChange(idx, "input", e.target.value)}
                placeholder="Input"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.output || ""}
                onChange={(e) => handleChange(idx, "output", e.target.value)}
                placeholder="Output"
                className="border px-4 py-2 rounded text-base w-full"
              />
              <input
                type="text"
                value={p.observaciones || ""}
                onChange={(e) => handleChange(idx, "observaciones", e.target.value)}
                placeholder="Observaciones"
                className="border px-4 py-2 rounded text-base w-full col-span-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={guardarProcesos}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export default CadenaValorTab;




