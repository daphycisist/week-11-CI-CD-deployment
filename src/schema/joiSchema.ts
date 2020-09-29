import Joi from "joi";

const signupSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).alphanum().required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).alphanum().required(),
});

const organaizationSchema = Joi.object().keys({
  organization: Joi.string().lowercase().required(),
  products: Joi.array().items(Joi.string().lowercase()).required(),
  marketvalue: Joi.number().required(),
  address: Joi.string().lowercase().required(),
  ceo: Joi.string().lowercase().required(),
  country: Joi.string().lowercase().required(),
  noOfEmployees: Joi.number(),
  employees: Joi.array().items(Joi.string().lowercase()).required()
});


export { loginSchema, signupSchema, organaizationSchema };
