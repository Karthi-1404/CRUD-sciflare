import Joi from "@hapi/joi"
export const userLogin = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
export const userSignup = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    fullName:Joi.string().required(),
    gender:Joi.string().valid('male','female', 'transgender').required(),
    role:Joi.string().valid('user','admin')
  });