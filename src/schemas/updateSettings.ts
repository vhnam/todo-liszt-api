import Joi from 'joi';

const updateSettingsSchema = Joi.object({
  language: Joi.string().valid('vi-VN', 'en-US').required(),
  timezone: Joi.string().min(2).max(255).required(),
  weekStart: Joi.string()
    .valid('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')
    .required(),
});

export default updateSettingsSchema;
