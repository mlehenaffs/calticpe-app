// backend/models/cadenaValor.js
const mongoose = require("mongoose");

const procesoSchema = new mongoose.Schema({
  proyectoId: { type: mongoose.Schema.Types.ObjectId, ref: "Proyecto", required: true },
  nombre: { type: String, required: true },
  prioridad: String,
  inicio: String,
  fin: String,
  responsable: String,
  subprocesos: String,
  input: String,
  output: String,
  observaciones: String,
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CadenaValor", procesoSchema);
