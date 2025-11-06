const express = require("express");
const router = express.Router();
const Workout = require("../models/workout");

// Get all workouts
router.get("/", async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

// Add a workout
router.post("/", async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.json({ message: "Workout added", newWorkout });
});

// Update a workout
router.put("/:id", async (req, res) => {
  const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Workout updated", updatedWorkout });
});

// Delete a workout
router.delete("/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: "Workout deleted" });
});

module.exports = router;
