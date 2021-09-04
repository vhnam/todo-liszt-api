import Joi from 'joi';

const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    })
    .required(),
  password: Joi.string().min(8).max(255).required(),
  token: Joi.string()
    .pattern(new RegExp(/^\$2[ayb]\$.{56}$/))
    .required(),
});

export default resetPasswordSchema;
