export interface IJsonDatabase {
    apps: IApp[]
}

export interface IApp {
    appId: string
    appName: string
    appPath: string
    owner: string
    isValid: boolean
}
