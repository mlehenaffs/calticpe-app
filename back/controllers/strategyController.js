const Strategy = require("../models/Strategy");

exports.getByProject = async (req, res) => {
  const { projectId } = req.params;
  const strat = await Strategy.findOne({ projectId });
  res.status(200).json(strat || {});
};

exports.createOrUpdate = async (req, res) => {
  const { projectId, ...fields } = req.body;
  const updated = await Strategy.findOneAndUpdate(
    { projectId },
    { projectId, ...fields },
    { upsert: true, new: true }
  );
  res.json(updated);
};


