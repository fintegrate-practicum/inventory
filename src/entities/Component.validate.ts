import * as Joi from '@hapi/joi';

export const componentValidationSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'name must be between 3 and 20 letters',
    'string.max': 'name must be between 3 and 20 letters',
    'any.required': 'name is required',
  }),
  componentBuyPrice: Joi.number().min(1).required().messages({
    'number.min': 'price must be more than 1',
    'any.required': 'componentBuyPrice is required',
  }),
  addingComponentDate: Joi.date().required(),
  minQuantity: Joi.number().min(1).required().messages({
    'number.min': 'min quantity must be positive',
    'any.required': 'minQuantity is required',
  }),
  stockQuantity: Joi.number().min(0).required().messages({
    'number.min': 'stoke must be positive',
    'any.required': 'stockQuantity is required',
  }),
  isActive: Joi.boolean().required(),
  adminId: Joi.string().required(),
  isSoldSeparately: Joi.boolean().required(),
  description: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  salePrice: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  images: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.array().items(Joi.string()).required(),
    otherwise: Joi.array().items(Joi.string()).optional(),
  }),
  isOnSale: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.boolean().required(),
    otherwise: Joi.boolean().optional(),
  }),
  salePercentage: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.number().min(0).required().messages({
      'number.min': 'percentage must be positive',
    }),
    otherwise: Joi.number().optional(),
  }),
  componentColor: Joi.string().optional().allow(null, ''),
  componentSize: Joi.string().optional().allow(null, ''),
  businessId: Joi.string().required(),
});
