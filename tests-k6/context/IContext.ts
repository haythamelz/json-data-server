import { JSONObject } from 'k6'
import { Response } from 'k6/http'

export default interface IContext {
    session: {
        [response: string]: string | Response | JSONObject | string[]
    }
}
