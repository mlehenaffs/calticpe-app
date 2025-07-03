const mongoose = require("mongoose");
const strategySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  missionCurrent: String, missionNew: String,
  valuesCurrent: String, valuesNew: String,
  behaviors: String,
  visionLongCurrent: String, visionLongNew: String,
  visionShortCurrent: String, visionShortNew: String,
});
module.exports = mongoose.model("Strategy", strategySchema);


