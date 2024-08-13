import IContext from '@k6/context/IContext'
/* @ts-expect-error: Testing library */
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js'
import AppDataSteps from '@k6/steps/AppDataSteps.js'

const searchAllApps = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** Search apps feature: Search apps', () => {
        describe('Given I search for all apps', () => {
            const searchAppsResponse = appDataSteps.getApps()

            expect(searchAppsResponse.status, 'status').to.equal(200)
            expect(searchAppsResponse).to.have.validJsonBody()

            const searchAppsResponseBody = searchAppsResponse.body as string

            context.session = {
                ...context.session,
                searchAppsResponseBody: searchAppsResponseBody
            }
        })

        describe('Then I a list of all apps', () => {
            const searchAppsResponseBodyObj = JSON.parse(
                context.session.searchAppsResponseBody as string,
            ) 

            expect(searchAppsResponseBodyObj.apps.length >= 3, 'search returns apps').to.be.true
        })
    })
    return context
}

const searchForValidAppId = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** Search apps feature: Search valid app', () => {
        describe('Given I search with a valid appId', () => {
            const updateAppDataWithoutIsValidFieldResponseBodyObj = JSON.parse(context.session.updateAppDataWithoutIsValidFieldResponseBody as string)
            const validAppId = updateAppDataWithoutIsValidFieldResponseBodyObj.appId
            const searchAppResponse = appDataSteps.getApps(validAppId)

            expect(searchAppResponse.status, 'status').to.equal(200)
            expect(searchAppResponse).to.have.validJsonBody()

            const searchAppResponseBody = searchAppResponse.body as string

            context.session = {
                ...context.session,
                validAppId: validAppId,
                searchAppResponseBody: searchAppResponseBody
            }
        })

        describe('Then the app result returns', () => {
            const searchAppResponseBodyObj = JSON.parse(
                context.session.searchAppResponseBody as string,
            ) 

            expect(searchAppResponseBodyObj.appId, 'valid appId').to.equal(context.session.validAppId)
        })
    })
    return context
}

const searchForInvalidAppId = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** Search apps feature: Search invalid app', () => {
        describe('Given I search with an invalid appId', () => {
            const createAppIsValidFalseResponseBodyObj = JSON.parse(context.session.createAppIsValidFalseResponseBody as string)

            const invalidAppId = createAppIsValidFalseResponseBodyObj.appId
            const searchInvalidAppResponse = appDataSteps.getApps(invalidAppId)

            expect(searchInvalidAppResponse.status, 'status').to.equal(404)
            expect(searchInvalidAppResponse).to.have.validJsonBody()

            const searchInvalidAppResponseBody = searchInvalidAppResponse.body as string

            context.session = {
                ...context.session,
                searchInvalidAppResponseBody: searchInvalidAppResponseBody
            }
        })

        describe('Then the app result returns', () => {
            expect(context.session.searchInvalidAppResponseBody as string, 'invalid appId response').to.equal("Not found")
        })
    })
    return context
}

export const searchAppPositiveFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
) => [searchAllApps(context, appDataSteps), searchForValidAppId(context, appDataSteps)]

export const searchAppNegativeFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
): IContext[] => [
    searchForInvalidAppId(context, appDataSteps)
]
