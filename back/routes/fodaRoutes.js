const express = require("express");
const router = express.Router();
const Foda = require("../models/Foda");

// Crear un nuevo análisis FODA
router.post("/", async (req, res) => {
  try {
    const { proyectoId } = req.body;

    // Si ya existe un FODA para ese proyecto, rechazar
    const existente = await Foda.findOne({ proyectoId });
    if (existente) {
      return res.status(400).json({ error: "Ya existe un FODA para este proyecto." });
    }

    const nuevoFoda = new Foda(req.body);
    await nuevoFoda.save();
    res.status(201).json(nuevoFoda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener el FODA por ID de proyecto
router.get("/:proyectoId", async (req, res) => {
  try {
    const foda = await Foda.findOne({ proyectoId: req.params.proyectoId });
    if (!foda) {
      return res.status(404).json({ error: "FODA no encontrado" });
    }
    res.json(foda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar FODA existente
router.put("/:proyectoId", async (req, res) => {
  try {
    const fodaActualizado = await Foda.findOneAndUpdate(
      { proyectoId: req.params.proyectoId },
      req.body,
      { new: true }
    );
    if (!fodaActualizado) {
      return res.status(404).json({ error: "FODA no encontrado para actualizar" });
    }
    res.json(fodaActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


