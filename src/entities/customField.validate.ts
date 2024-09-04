import * as Joi from '@hapi/joi';

const optionSchema = Joi.object({
  value: Joi.string().optional(),
  label: Joi.string().optional(),
});

export const customFieldSchema: Joi.ObjectSchema = Joi.object({
  fieldName: Joi.string().required(),
  fieldType: Joi.string()
    .valid(
      'Button',
      'ButtonGroup',
      'Checkbox',
      'FloatingActionButton',
      'RadioGroup',
      'Rating',
      'Select',
      'Slider',
      'Switch',
      'TextField',
      'MenuItem',
      'Input',
    )
    .required(),
  options: Joi.array().items(optionSchema).optional().default([]),
  isRequired: Joi.boolean().default(false),
});
