import * as Joi from 'joi'

export const createThreadSchema = Joi.object().keys({
    content: Joi.string().required(),
    image: Joi.string().required(),
});

export const updateThreadSchema = Joi.object().keys({
    content: Joi.string(),
    image: Joi.string(),
});