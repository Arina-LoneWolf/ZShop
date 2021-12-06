import validateRequest from './validateRequest.js';
import Joi from 'joi';

const typeValidate = {
  add: (req, res, next) => {
    const schema = Joi.object({
      categoryId: Joi.number().required(),
      name: Joi.string().min(1).max(50).required(),
      typeKey: Joi.string().min(1).max(50).required(),
    });
    validateRequest(req, res, next, schema);
  },

  update: (req, res, next) => {
    const schema = Joi.object({
      categoryId: Joi.number().required(),
      name: Joi.string().min(1).max(50).required(),
      typeKey: Joi.string().min(1).max(50).required(),
    });
    validateRequest(req, res, next, schema);
  },
};

export default typeValidate;
