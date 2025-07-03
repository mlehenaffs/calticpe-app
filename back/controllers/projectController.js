const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("assignedUsers", "name email role");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, client, assignedUsers } = req.body;
    const newProject = new Project({ name, description, client, assignedUsers });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Error creating project" });
  }
};
