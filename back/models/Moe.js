const mongoose = require("mongoose");

const moeSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  elements: [
    {
      id: { type: String, required: true },
      label: { type: String, required: true },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
      connections: [{ type: String }], // IDs of connected nodes
    },
  ],
});

module.exports = mongoose.model("Moe", moeSchema);

