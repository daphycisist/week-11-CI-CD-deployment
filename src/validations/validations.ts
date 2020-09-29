import { loginSchema, organaizationSchema, signupSchema } from '../schema/joiSchema';
// import { Request, Response, NextFunction } from "express";

const validateLoginInput = (userInput: object) => {
  const { error, value } = loginSchema.validate(userInput);
  if (error) throw new Error(error.details[0].message);
  return value;
};

const validateSignupInput = (userInput: object) => {
  const { error, value } = signupSchema.validate(userInput);
  if (error) throw new Error(error.details[0].message);
  return value;  
};
const validateOrganizationInput = (userInput: object) => {
  const { error, value } = organaizationSchema.validate(userInput);
  if (error) throw new Error(error.details[0].message);
  return value;  
};

export { validateLoginInput, validateSignupInput, validateOrganizationInput };
