import Joi from 'joi';

const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(255)
    .required(),
  password: Joi.string().min(8).max(255).required(),
});

export default updateUserSchema;
