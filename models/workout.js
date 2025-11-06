const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  exercise: { type: String, required: true },
  duration: { type: Number, required: true }, // minutes
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workout", workoutSchema);
