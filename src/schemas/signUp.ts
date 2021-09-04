import Joi from 'joi';

const signUpSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    })
    .required(),
  password: Joi.string().min(8).max(255).required(),
  type: Joi.string().valid('email'),
});

export default signUpSchema;
