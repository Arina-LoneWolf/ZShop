import validateRequest from './validateRequest.js';
import Joi from 'joi';

const bannerValidate = {
  add: (req, res, next) => {
    const schema = Joi.object({
      bannerLink: Joi.string().min(1).max(200).required(),
    });
    validateRequest(req, res, next, schema);
  },
  update: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      bannerLink: Joi.string().min(1).max(200).required(),
    });
    validateRequest(req, res, next, schema);
  },
};

export default bannerValidate;
