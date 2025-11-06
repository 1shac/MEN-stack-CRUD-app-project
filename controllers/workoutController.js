const Workout = require("../models/workout");

// Create a new workout
exports.addWorkout = async (req, res) => {
  try {
    const { exercise, duration } = req.body;
    const newWorkout = new Workout({
      user: req.user._id,
      exercise,
      duration,
    });
    await newWorkout.save();
    res.status(201).json({ message: "✅ Workout added successfully", newWorkout });
  } catch (err) {
    res.status(500).json({ message: "❌ Error adding workout", error: err.message });
  }
};

// Get all workouts for a user
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching workouts", error: err.message });
  }
};
