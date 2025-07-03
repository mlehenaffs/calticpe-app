const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Obtener todos los proyectos con datos de cliente y usuarios
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client")
      .populate("accessUsers", "name email"); 
    res.json(projects);
  } catch (error) {
    console.error("Error al obtener proyectos:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo proyecto
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear proyecto:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar proyecto
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar proyecto:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar proyecto
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Proyecto eliminado" });
  } catch (error) {
    console.error("Error al eliminar proyecto:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
