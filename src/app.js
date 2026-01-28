const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logRequest = require("./middlewares/logRequest");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const medicationLogRoutes = require("./routes/medicationLogRoutes");

const app = express();

app.use(cors()); //  allow all origins
app.use(express.json());
app.use(morgan("dev"));
app.use(logRequest);

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/medication-logs", medicationLogRoutes);

app.use(errorHandler);

module.exports = app;