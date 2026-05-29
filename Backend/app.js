require("dotenv").config();
const express = require("express");
const cors = require("cors");

// rotas que preciso criar 

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");

const { errorHandler} = require("./src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok:true}));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

module.exports = app;
