const Joi = require("joi");

// CREATE APPOINTMENT
const createAppointmentValidator = Joi.object({
  doctorName: Joi.string().required(),

  clinicName: Joi.string().required(),

  date: Joi.date().required(),

  time: Joi.string().required(),

  notes: Joi.string().optional(),

  status: Joi.string()
    .valid("scheduled", "completed", "cancelled")
    .default("scheduled"),
});

// UPDATE APPOINTMENT (at least one field required)
const updateAppointmentValidator = Joi.object({
  doctorName: Joi.string().optional(),

  clinicName: Joi.string().optional(),

  date: Joi.date().optional(),

  time: Joi.string().optional(),

  notes: Joi.string().optional(),

  status: Joi.string()
    .valid("scheduled", "completed", "cancelled")
    .optional(),
}).min(1);

module.exports = {
  createAppointmentValidator,
  updateAppointmentValidator,
};