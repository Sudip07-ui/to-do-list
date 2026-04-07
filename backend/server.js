const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Planner Schema
const plannerSchema = new mongoose.Schema({
  date: { type: String, required: true },
  goal: String,
  appointments: [{ time: String, event: String }],
  mealTracker: {
    breakfast: String,
    lunch: String,
    dinner: String,
    snacks: String
  },
  waterIntake: Number,
  thingsToDo: String,
  exercise: {
    minutes: String,
    steps: String
  },
  mood: String,
  grateful: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const Planner = mongoose.model('Planner', plannerSchema);

// Save Planner Data
app.post('/api/planner', async (req, res) => {
  try {
    const newPlanner = new Planner(req.body);
    await newPlanner.save();
    res.status(201).json({ message: "Planner saved successfully!", data: newPlanner });
  } catch (error) {
    res.status(500).json({ message: "Error saving planner", error: error.message });
  }
});

// Get Latest Planner
app.get('/api/planner', async (req, res) => {
  try {
    const latest = await Planner.findOne().sort({ createdAt: -1 });
    res.json(latest || { message: "No planner found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching planner" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});