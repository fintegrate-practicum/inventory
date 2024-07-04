import * as Joi from '@hapi/joi';

export const componentValidationSchema :Joi.ObjectSchema= Joi.object({
  id: Joi.string().optional(),
  componentName: Joi.string().min(3).max(20).required().messages({
    'string.min': "name must be between 3 and 20 letters",
    'string.max': "name must be between 3 and 20 letters",
    'any.required': "componentName is required"
  }),
  componentBuyPrice: Joi.number().min(1).required().messages({
    'number.min': "price must be more than 1",
    'any.required': "componentBuyPrice is required"
  }),
  addingComponentDate: Joi.date().required(),
  minQuantity: Joi.number().min(1).required().messages({
    'number.min': "min quantity must be positive",
    'any.required': "minQuantity is required"
  }),
  componentStock: Joi.number().min(0).required().messages({
    'number.min': "stoke must be positive",
    'any.required': "componentStock is required"
  }),
  isActive: Joi.boolean().required(),
  adminId: Joi.string().required(),
  isSoldSeparately: Joi.boolean().required(),
  componentDescription: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.string().required(),
    otherwise: Joi.string().optional()
  }),
  salePrice: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional()
  }),
  componentImages: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.array().items(Joi.string()).required(),
    otherwise: Joi.array().items(Joi.string()).optional()
  }),
  isInSale: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.boolean().required(),
    otherwise: Joi.boolean().optional()
  }),
  salePercentage: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.number().min(0).required().messages({
      'number.min': "percentage must be positive"
    }),
    otherwise: Joi.number().optional()
  }),
  componentColor: Joi.string().optional(),
  componentSize: Joi.string().optional(),
  businessId: Joi.string().required()
});