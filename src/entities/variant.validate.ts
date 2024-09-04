import * as Joi from '@hapi/joi';

// Define the schema for customFields (as an object with dynamic keys and values)
const customFieldsSchema = Joi.object()
  .pattern(
    Joi.string(), // Key should be a string
    Joi.alternatives().try(
      Joi.string(),
      Joi.number(),
      Joi.boolean(),
      Joi.object(), // Allow objects as values, but you may need to specify more constraints
    ),
  )
  .optional();

// Define the schema for the Variant
export const variantSchema: Joi.ObjectSchema = Joi.object({
  customFields: customFieldsSchema,
  stockQuantity: Joi.number().min(0).optional().messages({
    'number.min': 'Stock quantity must be non-negative',
    'any.required': 'Stock quantity is required',
  }),
  additionalPrice: Joi.number().min(0).optional().default(0).messages({
    'number.min': 'Additional price must be non-negative',
  }),
});
