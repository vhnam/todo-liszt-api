import Joi from 'joi';

const updateListSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255),
  startAt: Joi.date().timestamp(),
  endAt: Joi.date().timestamp(),
  color: Joi.string().pattern(new RegExp(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)),
});

export default updateListSchema;
