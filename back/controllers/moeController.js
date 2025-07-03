const Moe = require("../models/Moe");

// Crear un nuevo MOE
const createMoe = async (req, res) => {
  try {
    const existing = await Moe.findOne({ projectId: req.body.projectId });
    if (existing) {
      return res.status(200).json(existing);
    }

    const newMoe = new Moe(req.body);
    const savedMoe = await newMoe.save();
    res.status(201).json(savedMoe);
  } catch (error) {
    res.status(500).json({ message: "Error creating MOE", error });
  }
};


// Obtener los MOE de un proyecto
const getMoesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const moes = await Moe.find({ projectId });
    if (!moes || moes.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(moes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching MOEs", error });
  }
};

// Actualizar un MOE existente
const updateMoe = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Moe.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un MOE
const deleteMoe = async (req, res) => {
  try {
    await Moe.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMoe,
  getMoesByProject,
  updateMoe,
  deleteMoe,
};
