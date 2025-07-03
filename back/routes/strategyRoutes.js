const express = require("express");
const { getByProject, createOrUpdate } = require("../controllers/strategyController");
const router = express.Router();

router.get("/:projectId", getByProject);
router.put("/:projectId", createOrUpdate);  
module.exports = router;

