const Joi = require("joi");

// CREATE MEDICATION
const createMedicationValidator = Joi.object({
  name: Joi.string().required(),

  dosage: Joi.string().required(),

  instructions: Joi.string().optional(),

  startDate: Joi.date().optional(),

  endDate: Joi.date().optional(),

  schedules: Joi.array().items(
    Joi.object({
      time: Joi.string().required(),
      frequency: Joi.string()
        .valid("daily", "weekly")
        .optional(),
    })
  ).optional(),
});

// UPDATE MEDICATION
const updateMedicationValidator = Joi.object({
  name: Joi.string().optional(),

  dosage: Joi.string().optional(),

  instructions: Joi.string().optional(),

  startDate: Joi.date().optional(),

  endDate: Joi.date().optional(),

  schedules: Joi.array().items(
    Joi.object({
      time: Joi.string().required(),
      frequency: Joi.string()
        .valid("daily", "weekly")
        .optional(),
    })
  ).optional(),
}).min(1);

module.exports = {
  createMedicationValidator,
  updateMedicationValidator,
};