const express = require("express");
const router = express.Router();
const Workout = require("../models/workout");

// Create (Add)
router.post("/workouts/add", async (req, res) => {
  try {
    const workout = new Workout({
      user: req.user._id,
      exercise: req.body.exercise,
      duration: req.body.duration,
    });
    await workout.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.send("Error adding workout");
  }
});

// Read (Dashboard)
router.get("/dashboard", async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id });
  res.render("dashboard", { name: req.user.name, workouts });
});

// Update
router.post("/workouts/edit/:id", async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, {
      exercise: req.body.exercise,
      duration: req.body.duration,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.send("Error editing workout");
  }
});

// Delete
router.post("/workouts/delete/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.send("Error deleting workout");
  }
});

module.exports = router;



