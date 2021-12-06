import validateRequest from './validateRequest.js';
import Joi from 'joi';
const userValidate = {
  register: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required(),
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().min(6).max(30).required(),
      email: Joi.string().email().required(),
    });
    validateRequest(req, res, next, schema);
  },

  login: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().min(6).max(30).required(),
    });
    validateRequest(req, res, next, schema);
  },
};

export default userValidate;
