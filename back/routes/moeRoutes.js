const express = require("express");
const {
  createMoe,
  getMoesByProject,
  updateMoe,
  deleteMoe
} = require("../controllers/moeController");
const router = express.Router();

router.get("/:projectId", getMoesByProject);
router.post("/", createMoe);
router.put("/:id", updateMoe);
router.delete("/:id", deleteMoe);

module.exports = router;




