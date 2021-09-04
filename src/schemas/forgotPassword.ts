import Joi from 'joi';

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    })
    .required(),
});

export default forgotPasswordSchema;
