const Joi = require("joi");

// REGISTER USER
const registerUserValidator = Joi.object({
  name: Joi.string().min(2).required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),
});

// LOGIN USER
const loginUserValidator = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string().required(),
});

module.exports = {
  registerUserValidator,
  loginUserValidator,
};