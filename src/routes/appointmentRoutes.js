const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const validate = require("../middlewares/validate");

const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const {
  createAppointmentValidator,
  updateAppointmentValidator,
} = require("../validators/appointmentValidator");

router.use(requireAuth);

router.post("/", validate(createAppointmentValidator), createAppointment);
router.get("/", getAppointments);
router.put("/:id", validate(updateAppointmentValidator), updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;