const express = require("express");
const router = express.Router();
const controller = require("../controllers/cadenaValorController");

// Obtener todos los procesos de un proyecto
router.get("/:id", controller.obtenerPorProyecto);

// Crear un nuevo proceso para un proyecto
router.post("/", controller.crearProceso);

// Eliminar un proceso por su ID
router.delete("/:id", controller.eliminarProceso);

module.exports = router;


