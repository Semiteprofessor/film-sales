const Joi = require("joi");

const createUserValidation = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    dob: Joi.string().required(),
    phone: Joi.string().required(),
  });
  return userSchema.validate(data);
};

const loginUserValidation = () => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return loginSchema.validate;
};

const updateUserValidation = (data) => {
  const updateUserSchema = joi.object({
    name: joi.string(),
    username: joi.string(),
    dob: joi.date().string(),
    phone: joi.string(),
  });
  return updateUserSchema.validate(data);
};

module.exports = {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
};
