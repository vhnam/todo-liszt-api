import Joi from 'joi';

const renewTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .pattern(
      new RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
    )
    .required(),
});

export default renewTokenSchema;
