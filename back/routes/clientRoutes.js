const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// Obtener todos los clientes
router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// Crear un cliente
router.post("/", async (req, res) => {
  const newClient = new Client(req.body);
  const saved = await newClient.save();
  res.json(saved);
});

// Actualizar cliente
router.put("/:id", async (req, res) => {
  const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Eliminar cliente
router.delete("/:id", async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Cliente eliminado" });
});

module.exports = router;
