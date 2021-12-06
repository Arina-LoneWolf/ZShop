import validateRequest from './validateRequest.js';
import Joi from 'joi';

const commentValidate = {
  add: (req, res, next) => {
    const schema = Joi.object({
      parentId: Joi.number().required(),
      userId: Joi.number().required(),
      productId: Joi.number().required(),
      content: Joi.string().min(1).max(1000).required(),
    });
    validateRequest(req, res, next, schema);
  },
};

export default commentValidate;
