const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logRequest = require("./middlewares/logRequest");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const medicationLogRoutes = require("./routes/medicationLogRoutes");

const app = express();

app.use(cors()); //  allow all origins
app.use(express.json());
app.use(morgan("dev"));
app.use(logRequest);

// swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "./docs/swagger.yaml")
);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api/docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/medication-logs", medicationLogRoutes);

app.use(errorHandler);

module.exports = app;