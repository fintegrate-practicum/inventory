import * as Joi from '@hapi/joi';
import { customFieldSchema } from '../entities/customField.validate';
import { variantSchema } from '../entities/variant.validate';

export const productValidationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Product name must be between 3 and 20 letters',
    'string.max': 'Product name must be between 3 and 20 letters',
    'any.required': 'Product name is required',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required',
  }),
  images: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Images are required',
  }),
  packageCost: Joi.number().min(0).required().messages({
    'number.min': 'Package cost must be positive',
    'any.required': 'Package cost is required',
  }),
  productComponents: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Product components are required',
  }),
  totalPrice: Joi.number().min(1).required().messages({
    'number.min': 'Total price must be positive',
    'any.required': 'Total price is required',
  }),
  adminId: Joi.string().required().messages({
    'any.required': 'Admin ID is required',
  }),
  isActive: Joi.boolean().required().messages({
    'any.required': 'isActive is required',
  }),
  isOnSale: Joi.boolean().optional().allow(null),
  salePercentage: Joi.number().min(0).optional().allow(null).messages({
    'number.min': 'Sale percentage cannot be negative',
  }),
  stockQuantity: Joi.number().min(0).required().messages({
    'number.min': 'Stock quantity cannot be negative',
    'any.required': 'Stock quantity is required',
  }),
  businessId: Joi.string().required().messages({
    'any.required': 'Business ID is required',
  }),
  componentStatus: Joi.string().min(3).max(15).required().messages({
    'string.min': 'Status must be between 3 and 15 letters',
    'string.max': 'Status must be between 3 and 15 letters',
    'any.required': 'Component status is required',
  }),
  customFields: Joi.array().items(customFieldSchema).messages({
    'array.includes': 'Custom fields are not valid',
  }),
  variants: Joi.array().items(variantSchema).messages({
    'array.includes': 'Variants are not valid',
  }),
});
