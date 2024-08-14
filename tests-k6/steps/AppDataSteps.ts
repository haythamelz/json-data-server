import http, { Response } from 'k6/http'
import { getHTTPParams } from '@k6/helpers/httpParamsHelper.js'
import ISettings from '@k6/env/ISettings'
import { JSONObject } from 'k6'

export default class AppDataSteps {
    private readonly baseUrl: string

    constructor(envSettings: ISettings) {
        this.baseUrl = envSettings.baseUrl
    }

    public getApps(appId = '') {
        const response: Response = http.get(
            `${this.baseUrl}/json-data/app/${appId}`,
            getHTTPParams(),
        )

        return response
    }

    public createApp(payload: JSONObject) {
        const response: Response = http.post(
            `${this.baseUrl}/json-data/create-app`,
            JSON.stringify(payload),
            getHTTPParams(),
        )

        return response
    }

    public updateApp(appId: string, payload: JSONObject) {
        const response: Response = http.put(
            `${this.baseUrl}/json-data/update-app/${appId}`,
            JSON.stringify(payload),
            getHTTPParams(),
        )

        return response
    }

    public deleteApp(appId: string) {
        const response: Response = http.del(
            `${this.baseUrl}/json-data/delete-app/${appId}`,
            {},
            getHTTPParams(),
        )

        return response
    }
}
