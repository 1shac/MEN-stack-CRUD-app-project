const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const pageRoutes = require("./routes/workout");
const User = require("./models/user");
const Workout = require("./models/workout");

dotenv.config();

// Passport Config
passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email.' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// Session + Passport setup
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// protect routes middleware - must come after passport.session()
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Apply middleware to route prefixes so all routes under them are protected
app.use('/dashboard', ensureAuth);
app.use('/workouts', ensureAuth);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Authentication middleware (kept for compatibility)
// prefer `ensureAuth` above for route protection
const isAuthenticated = ensureAuth;

// Auth routes
app.get("/", (req, res) => res.redirect('/login'));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/dashboard", ensureAuth, async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id });
  res.render("dashboard", { name: req.user.name, workouts });
});

// API Routes
app.use("/api", userRoutes); // Authentication API
app.use("/api/workouts", ensureAuth, workoutRoutes); // Protected Workout API
app.use("/", ensureAuth, pageRoutes); // Protected pages

// Logout route
app.post("/api/logout", (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

