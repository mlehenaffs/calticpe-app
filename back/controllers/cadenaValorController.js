const CadenaValor = require("../models/cadenaValor");

exports.obtenerPorProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const procesos = await CadenaValor.find({ proyectoId: id });
    res.json(procesos);
  } catch (error) {
    console.error("Error al obtener procesos:", error);
    res.status(500).json({ error: "Error al obtener procesos" });
  }
};

exports.crearProceso = async (req, res) => {
  try {
    const nuevo = new CadenaValor(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear proceso:", error);
    res.status(500).json({ error: "Error al crear proceso" });
  }
};

exports.eliminarProceso = async (req, res) => {
  try {
    const { id } = req.params;
    await CadenaValor.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error al eliminar proceso:", error);
    res.status(500).json({ error: "Error al eliminar proceso" });
  }
};
