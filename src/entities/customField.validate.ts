import * as Joi from '@hapi/joi';

// Define the schema for options
const optionSchema = Joi.object({
  value: Joi.string().optional(),
  label: Joi.string().optional(),
});

// Define the schema for CustomField
export const customFieldSchema: Joi.ObjectSchema = Joi.object({
  fieldName: Joi.string().optional(),
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
    .optional(),
  options: Joi.array().items(optionSchema).optional().default([]),
  isRequired: Joi.boolean().default(false),
});

export enum ComponentType {
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
  Checkbox = 'Checkbox',
  FloatingActionButton = 'FloatingActionButton',
  RadioGroup = 'RadioGroup',
  Rating = 'Rating',
  Select = 'Select',
  Slider = 'Slider',
  Switch = 'Switch',
  TextField = 'TextField',
  MenuItem = 'MenuItem',
  Input = 'Input',
}
