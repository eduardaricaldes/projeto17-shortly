import Joi from 'joi';

export const SignUpSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().min(3).required(),
})

export const SignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
})