const mongoose = require("mongoose");

const fodaSchema = new mongoose.Schema({
  fortalezas: [{ type: String }],
  oportunidades: [{ type: String }],
  debilidades: [{ type: String }],
  amenazas: [{ type: String }],
  proyectoId: { type: mongoose.Schema.Types.ObjectId, ref: "Proyecto" },
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Foda", fodaSchema);

