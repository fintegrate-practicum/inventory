import * as Joi from '@hapi/joi';

export const productValidationSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  packageCost: Joi.number().min(0).required().messages({
    'number.min': 'package cost must be positive',
    'any.required': 'packageCost is required',
  }),
  productComponents: Joi.array().items(Joi.string()).required(),
  totalPrice: Joi.number().min(1).required().messages({
    'number.min': 'price must be positive',
    'any.required': 'totalPrice is required',
  }),
  adminId: Joi.string().required(),
  isActive: Joi.boolean().required(),
  isOnSale: Joi.boolean().optional().allow(null),
  salePercentage: Joi.number().min(0).optional().allow(null).messages({
    'number.min': 'percentage cannot be negative',
  }),
  stockQuantity: Joi.number().min(0).required().messages({
    'number.min': 'stock cannot be negative',
    'any.required': 'stockQuantity is required',
  }),
  businessId: Joi.string().required(),
  componentStatus: Joi.string().min(3).max(15).required().messages({
    'string.min': 'status must be between 3 and 15 letters',
    'string.max': 'status must be between 3 and 15 letters',
    'any.required': 'componentStatus is required',
  }),
});
