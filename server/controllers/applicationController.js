import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const application = await Application.create({
      user: req.userId, 
      title,
      description,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating application" });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting application" });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findOne({ _id: req.params.id, user: req.userId });
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching application" });
  }
};
