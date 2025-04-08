import Joi from "joi"

export const depositValidation = Joi.object({
  hash: Joi.string().required(),
  chain: Joi.string().required()
});

export const withdrawalValidation = Joi.object({
    hash: Joi.string().required(),
    chain: Joi.string().required(),
    amount: Joi.number().required().positive(),
})