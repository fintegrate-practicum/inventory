import * as Joi from '@hapi/joi';

const providerSchema: Joi.ObjectSchema = Joi.object({
  providerName: Joi.string()
    .required()
    .min(2)
    .max(15)
    .messages({ 'min': 'Provider name must be at least 2 characters long', 'max': 'Provider name must be at most 15 characters long' }),
  providerEmail: Joi.string()
    .required()
    .email({ errorMessage: 'Please provide a valid email address' }),
  providerPhone: Joi.string()
    .required()
    .length(10, 'utf8')
    .messages({ 'length': 'Phone number must be 10 digits long' }),
  webSiteUrl: Joi.string().optional().uri({ allowRelative: false }), 
  businessId: Joi.string().required(),
  isActive: Joi.boolean().required(),
});

export default providerSchema;
