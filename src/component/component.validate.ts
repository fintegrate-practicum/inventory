import * as Joi from '@hapi/joi';
import { customFieldSchema } from '../entities/customField.validate';
import { variantSchema } from '../entities/variant.validate';

export const componentValidationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name must be between 3 and 20 letters',
    'string.max': 'Name must be between 3 and 20 letters',
    'any.required': 'Name is required',
  }),
  componentBuyPrice: Joi.number().min(1).required().messages({
    'number.min': 'Price must be more than 1',
    'any.required': 'ComponentBuyPrice is required',
  }),
  addingComponentDate: Joi.date().optional(), // Allow it to be omitted if defaulted on the server
  minQuantity: Joi.number().min(1).required().messages({
    'number.min': 'Minimum quantity must be positive',
    'any.required': 'MinQuantity is required',
  }),
  stockQuantity: Joi.number().min(0).required().messages({
    'number.min': 'Stock must be positive',
    'any.required': 'StockQuantity is required',
  }),
  isActive: Joi.boolean().optional(), // Allow it to be omitted if defaulted on the server
  adminId: Joi.string().required(),
  isSoldSeparately: Joi.boolean().required(),
  description: Joi.when('isSoldSeparately', {
    is: true,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  totalPrice: Joi.when('isSoldSeparately', {
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
      'number.min': 'Percentage must be positive',
    }),
    otherwise: Joi.number().optional(),
  }),
  businessId: Joi.string().required(),
  customFields: Joi.array().items(customFieldSchema).messages({
    'array.includes': 'Custom fields are not valid',
  }),
  variants: Joi.array().items(variantSchema).messages({
    'array.includes': 'Variants are not valid',
  }),
});
