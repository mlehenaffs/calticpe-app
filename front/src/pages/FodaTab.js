import React, { useEffect, useState } from "react";

function FodaTab({ projectId }) {
  const [foda, setFoda] = useState({
    fortalezas: Array(5).fill(""),
    oportunidades: Array(5).fill(""),
    debilidades: Array(5).fill(""),
    amenazas: Array(5).fill(""),
  });

  const [existeFoda, setExisteFoda] = useState(false);

  // ✅ Al cargar, obtener FODA si ya existe
  useEffect(() => {
    const fetchFoda = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/foda/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          setFoda({
            fortalezas: data.fortalezas.length ? data.fortalezas : Array(5).fill(""),
            oportunidades: data.oportunidades.length ? data.oportunidades : Array(5).fill(""),
            debilidades: data.debilidades.length ? data.debilidades : Array(5).fill(""),
            amenazas: data.amenazas.length ? data.amenazas : Array(5).fill(""),
          });
          setExisteFoda(true);
          console.log("FODA cargado:", data);
        }
      } catch (error) {
        console.error("Error al cargar FODA:", error);
      }
    };

    fetchFoda();
  }, [projectId]);

  const handleChange = (tipo, index, value) => {
    const copia = [...foda[tipo]];
    copia[index] = value;
    setFoda({ ...foda, [tipo]: copia });
  };

  const agregarCampo = (tipo) => {
    setFoda({ ...foda, [tipo]: [...foda[tipo], ""] });
  };

  const handleSave = async () => {
    const fodaConProyecto = { ...foda, proyectoId: projectId };
    const metodo = existeFoda ? "PUT" : "POST";
    const url = `http://localhost:5000/api/foda${existeFoda ? `/${projectId}` : ""}`;

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fodaConProyecto),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        alert("FODA guardado correctamente.");
        setExisteFoda(true);
      } else {
        alert("Error al guardar FODA.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor.");
    }
  };

  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-50";
      case "green":
        return "bg-green-50";
      case "red":
        return "bg-red-50";
      case "yellow":
        return "bg-yellow-50";
      default:
        return "bg-gray-100";
    }
  };

  const renderLista = (tipo, color, titulo) => {
    return (
      <div className={`${getColorClass(color)} border rounded-2xl p-4 shadow-md`}>
        <h3 className="font-semibold mb-2 text-gray-700">{titulo}</h3>
        {foda[tipo].map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleChange(tipo, index, e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder={`Escribe aquí...`}
          />
        ))}
        <button
          onClick={() => agregarCampo(tipo)}
          className="text-sm text-blue-600 mt-1 hover:underline"
        >
          + Agregar otra
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Análisis FODA</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-6">
        {renderLista("oportunidades", "blue", "🟦 Oportunidades")}
        {renderLista("fortalezas", "green", "🟩 Fortalezas")}
        {renderLista("amenazas", "red", "🟥 Amenazas")}
        {renderLista("debilidades", "yellow", "🟨 Debilidades")}
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar FODA
        </button>
      </div>
    </div>
  );
}

export default FodaTab;
