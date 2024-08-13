import IParams from '@k6/helpers/IParams'

export const getHTTPParams = (accessToken?: string): IParams => {
    const params: IParams = { headers: {} }

    params.headers = {
        'Content-Type': 'application/json',
    }

    if (accessToken) {
        params.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return params
}

export default {
    getHTTPParams,
}
