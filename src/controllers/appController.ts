import { Request, Response } from 'express'
import { getJsonData, updateJsonData } from '@datastore/jsonDatabase.js'
import { IJsonDatabase } from '@datastore/IJsonDatabase.js'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import {
    validateCreateAppData,
    validateUpdateAppData,
} from '@utils/validations.js'

dotenv.config()

export const getAppByAppId = async (req: Request, res: Response) => {
    const jsonData: IJsonDatabase = await getJsonData()
    const filterAppById = filterAppRecord(jsonData, req)

    if (!filterAppById) return res.status(404).send('Not found')

    return res.send(filterAppById)
}

export const getApps = async (req: Request, res: Response) => {
    const jsonData: IJsonDatabase = await getJsonData()

    return res.send(jsonData)
}

export const createApp = async (req: Request, res: Response) => {
    const validator = validateCreateAppData(req.body)
    if (validator.error) {
        return res.status(400).send({ error: validator.error.message })
    }
    const jsonData: IJsonDatabase = await getJsonData()
    const { appName, appPath, owner, isValid } = req.body

    const newAppRecord = {
        appId: uuidv4(),
        appName,
        appPath,
        owner,
        isValid: isValid ?? false,
    }

    jsonData.apps.push(newAppRecord)
    await updateJsonData(JSON.stringify(jsonData))

    return res.status(201).send(jsonData.apps[jsonData.apps.length - 1])
}

export const updateApp = async (req: Request, res: Response) => {
    const validator = validateUpdateAppData(req.body)
    if (validator.error) {
        return res.status(400).send({ error: validator.error.message })
    }
    const jsonData: IJsonDatabase = await getJsonData()
    const { owner, isValid } = req.body

    const filterAppById = filterAppRecord(jsonData, req)
    if (!filterAppById) return res.status(404).send('Not found')

    const index = jsonData.apps.indexOf(filterAppById)
    const updatedAppId = uuidv4()

    jsonData.apps[index] = {
        appId: updatedAppId,
        appName: filterAppById.appName,
        appPath: filterAppById.appPath,
        owner,
        isValid: isValid ?? false,
    }

    await updateJsonData(JSON.stringify(jsonData))

    return res.send(jsonData.apps[index])
}

export const deleteApp = async (req: Request, res: Response) => {
    const jsonData: IJsonDatabase = await getJsonData()
    const filterAppById = filterAppRecord(jsonData, req)

    if (!filterAppById) return res.status(404).send('Not found')

    const index = jsonData.apps.indexOf(filterAppById)
    jsonData.apps.splice(index, 1)

    await updateJsonData(JSON.stringify(jsonData))

    return res.send()
}

const filterAppRecord = (jsonData: IJsonDatabase, req: Request) =>
    jsonData.apps.find((rec) => rec.appId === req.params.appId)
