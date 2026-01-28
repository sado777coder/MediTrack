const Joi = require("joi");

// CREATE MEDICATION LOG
const createMedicationLogValidator = Joi.object({
  medicationId: Joi.string().required(),
  scheduledTime: Joi.string().optional(), // optional if you have schedules
  takenAt: Joi.date().optional(), // optional, defaults to now
  status: Joi.string().valid("taken", "missed", "skipped").optional().default("taken"),
  notes: Joi.string().optional(),
});

// UPDATE MEDICATION LOG
const updateMedicationLogValidator = Joi.object({
  scheduledTime: Joi.string().optional(),
  takenAt: Joi.date().optional(),
  status: Joi.string().valid("taken", "missed", "skipped").optional(),
  notes: Joi.string().optional(),
}).min(1);

module.exports = {
  createMedicationLogValidator,
  updateMedicationLogValidator,
};