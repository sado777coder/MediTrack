const Joi = require("joi");

// CREATE MEDICATION LOG
const createMedicationLogValidator = Joi.object({
  medicationId: Joi.string().required(),

  takenAt: Joi.date().required(),

  status: Joi.string()
    .valid("taken", "missed", "skipped")
    .required(),

  notes: Joi.string().optional(),
});

// UPDATE MEDICATION LOG
const updateMedicationLogValidator = Joi.object({
  takenAt: Joi.date().optional(),

  status: Joi.string()
    .valid("taken", "missed", "skipped")
    .optional(),

  notes: Joi.string().optional(),
}).min(1);

module.exports = {
  createMedicationLogValidator,
  updateMedicationLogValidator,
};