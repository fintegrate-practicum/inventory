import * as Joi from '@hapi/joi';

const customFieldsSchema = Joi.object()
  .pattern(
    Joi.string(), 
    Joi.alternatives().try(
      Joi.string(),
      Joi.number(),
      Joi.boolean(),
      Joi.object(), 
    ),
  )
  .required();

export const variantSchema: Joi.ObjectSchema = Joi.object({
  customFields: customFieldsSchema,
  stockQuantity: Joi.number().min(0).required().messages({
    'number.min': 'Stock quantity must be non-negative',
    'any.required': 'Stock quantity is required',
  }),
  additionalPrice: Joi.number().min(0).optional().default(0).messages({
    'number.min': 'Additional price must be non-negative',
  }),
});
