import validateRequest from './validateRequest.js';
import Joi from 'joi';
const productValidate = {
  add: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      category: Joi.string().min(2).max(50).required(),
      type: Joi.string().min(2).max(50).required(),
      price: Joi.number().required(),
      discount: Joi.number(),
      quantity: Joi.number().required(),
      sizes: Joi.array().items(Joi.string().min(1).required()).required(),
      images: Joi.array().items(Joi.string().min(1).required()).required(),
      status: Joi.array().items(Joi.string().min(1).required()).required(),
      colors: Joi.array().items(Joi.string().min(1).required()).required(),
    });
    validateRequest(req, res, next, schema);
  },

  edit: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      category: Joi.string().min(2).max(50).required(),
      type: Joi.string().min(2).max(50).required(),
      price: Joi.number().required(),
      discount: Joi.number(),
      quantity: Joi.number().required(),
      sizes: Joi.array().items(Joi.string().min(1).required()).required(),
      images: Joi.array().items(Joi.string().min(1).required()).required(),
      status: Joi.array().items(Joi.string().min(1).required()).required(),
      colors: Joi.array().items(Joi.string().min(1).required()).required(),
    });
    validateRequest(req, res, next, schema);
  },
};

export default productValidate;
