import validateRequest from './validateRequest.js';
import Joi from 'joi';

const categoryValidate = {
  add: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      categoryKey: Joi.string().min(1).max(50).required(),
    });
    validateRequest(req, res, next, schema);
  },

  update: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      categoryKey: Joi.string().min(1).max(50).required(),
    });
    validateRequest(req, res, next, schema);
  },
};

export default categoryValidate;
