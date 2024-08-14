import Joi from 'joi'
import { IApp } from '@datastore/IJsonDatabase.js'

export const validateCreateAppData = (createApp: IApp) => {
    const createAppSchema = Joi.object({
        appName: Joi.string().required(),
        appPath: Joi.string().required(),
        owner: Joi.string().required(),
        isValid: Joi.boolean(),
    })

    return createAppSchema.validate(createApp)
}

export const validateUpdateAppData = (updateApp: IApp) => {
    const createAppSchema = Joi.object({
        owner: Joi.string().required(),
        isValid: Joi.boolean(),
    })

    return createAppSchema.validate(updateApp)
}
