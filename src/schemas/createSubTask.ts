import Joi from 'joi';

const createSubTaskSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255),
});

export default createSubTaskSchema;
