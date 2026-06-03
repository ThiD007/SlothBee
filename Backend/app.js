const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");

// rotas que preciso criar 

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const timerRoutes = require("./src/routes/timer.route");
const pointsRoutes = require("./src/routes/points.route");
const goalRoutes = require("./src/routes/goal.route");
const balanceRoutes = require("./src/routes/balance.route");
const teamRoutes = require("./src/routes/team.route");
const blogRoutes = require("./src/routes/blog.route");

const { errorHandler} = require("./src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (req, res) => res.json({ ok:true}));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/timers", timerRoutes);
app.use("/points", pointsRoutes);
app.use("/balance", balanceRoutes);
app.use("/teams", teamRoutes);
app.use(goalRoutes);
app.use(blogRoutes);

app.use(errorHandler);

module.exports = app;
