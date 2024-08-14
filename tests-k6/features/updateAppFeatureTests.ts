import IContext from '@k6/context/IContext'
/* @ts-expect-error: Testing library */
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js'
/* @ts-expect-error: Testing library */
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import AppDataSteps from '@k6/steps/AppDataSteps.js'
import { JSONObject } from 'k6'

const updateAppsTest = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** Update apps feature: Update apps', () => {
        describe('Given I have valid requests for updating existing apps', () => {
            const updateAppDataRequestBody = {
                owner: 'test1-update',
                isValid: true,
            }

            const updateAppDataIsValidFalseRequestBody = {
                owner: `test-update${randomString(4)}`,
                isValid: false,
            }

            const updateAppDataWithoutIsValidFieldRequestBody = {
                owner: `test-update${randomString(4)}`
            }

            context.session = {
                ...context.session,
                updateAppDataRequestBody: updateAppDataRequestBody,
                updateAppDataIsValidFalseRequestBody: updateAppDataIsValidFalseRequestBody,
                updateAppDataWithoutIsValidFieldRequestBody: updateAppDataWithoutIsValidFieldRequestBody,
            }
        })

        describe('When I update data for existing apps', () => {
            const createAppResponseBodyObj = JSON.parse(
                context.session.createAppResponseBody as string,
            )
            const createAppIsValidFalseResponseBodyObj = JSON.parse(
                context.session.createAppIsValidFalseResponseBody as string,
            )

            const createAppWithoutIsValidFieldResponseBodyObj = JSON.parse(
                context.session.createAppWithoutIsValidFieldResponseBody as string,
            )

            const existingAppId1 = createAppResponseBodyObj.appId
            const existingAppId2 = createAppIsValidFalseResponseBodyObj.appId
            const existingAppId3 = createAppWithoutIsValidFieldResponseBodyObj.appId

            const updateAppDataResponse = appDataSteps.updateApp(existingAppId1,
                context.session.updateAppDataRequestBody as JSONObject,
            )
            const updateAppDataIsValidFalseResponse = appDataSteps.updateApp(existingAppId2,
                context.session.updateAppDataIsValidFalseRequestBody as JSONObject,
            )

            const updateAppDataWithoutIsValidFieldResponse = appDataSteps.updateApp(existingAppId3,
                context.session.updateAppDataWithoutIsValidFieldRequestBody as JSONObject,
            )

            expect(updateAppDataResponse.status, 'status').to.equal(200)
            expect(updateAppDataResponse).to.have.validJsonBody()

            expect(updateAppDataIsValidFalseResponse.status, 'status').to.equal(200)
            expect(updateAppDataIsValidFalseResponse).to.have.validJsonBody()

            expect(updateAppDataWithoutIsValidFieldResponse.status, 'status').to.equal(200)
            expect(updateAppDataWithoutIsValidFieldResponse).to.have.validJsonBody()

            const updateAppDataResponseBody = updateAppDataResponse.body as string
            const updateAppDataIsValidFalseResponseBody = updateAppDataIsValidFalseResponse.body as string
            const updateAppDataWithoutIsValidFieldResponseBody = updateAppDataWithoutIsValidFieldResponse.body as string

            context.session = {
                ...context.session,
                updateAppDataResponseBody: updateAppDataResponseBody,
                updateAppDataIsValidFalseResponseBody: updateAppDataIsValidFalseResponseBody,
                updateAppDataWithoutIsValidFieldResponseBody: updateAppDataWithoutIsValidFieldResponseBody
            }
        })

        describe('Then appIds are automatically updated, appName/appPath are unchanged, and owner/isValid are changed according to the request', () => {
            const createAppResponseBodyObj = JSON.parse(
                context.session.createAppResponseBody as string,
            )
            const createAppIsValidFalseResponseBodyObj = JSON.parse(
                context.session.createAppIsValidFalseResponseBody as string,
            )

            const createAppWithoutIsValidFieldResponseBodyObj = JSON.parse(
                context.session.createAppWithoutIsValidFieldResponseBody as string,
            )

            const oldAppId1 = createAppResponseBodyObj.appId
            const oldAppId2 = createAppIsValidFalseResponseBodyObj.appId
            const oldAppId3 = createAppWithoutIsValidFieldResponseBodyObj.appId

            const originalAppName1 = createAppResponseBodyObj.appName
            const originalAppName2 = createAppIsValidFalseResponseBodyObj.appName
            const originalAppName3 = createAppWithoutIsValidFieldResponseBodyObj.appName

            const originalAppPath1 = createAppResponseBodyObj.appPath
            const originalAppPath2 = createAppIsValidFalseResponseBodyObj.appPath
            const originalAppPath3 = createAppWithoutIsValidFieldResponseBodyObj.appPath

            const oldOwner1 = createAppResponseBodyObj.owner
            const oldOwner2 = createAppIsValidFalseResponseBodyObj.owner
            const oldOwner3 = createAppWithoutIsValidFieldResponseBodyObj.owner

            const updateAppDataResponseBodyObj = JSON.parse(context.session.updateAppDataResponseBody as string)
            const updateAppDataIsValidFalseResponseBodyObj = JSON.parse(context.session.updateAppDataIsValidFalseResponseBody as string)
            const updateAppDataWithoutIsValidFieldResponseBodyObj = JSON.parse(context.session.updateAppDataWithoutIsValidFieldResponseBody as string)

            expect(updateAppDataResponseBodyObj.appId, 'first appId').to.not.equal(oldAppId1)
            expect(updateAppDataIsValidFalseResponseBodyObj.appId, 'second appId').to.not.equal(oldAppId2)
            expect(updateAppDataWithoutIsValidFieldResponseBodyObj.appId, 'third appId').to.not.equal(oldAppId3)

            expect(updateAppDataResponseBodyObj.appName, 'first appName').to.equal(originalAppName1)
            expect(updateAppDataIsValidFalseResponseBodyObj.appName, 'second appName').to.equal(originalAppName2)
            expect(updateAppDataWithoutIsValidFieldResponseBodyObj.appName, 'third appName').to.equal(originalAppName3)

            expect(updateAppDataResponseBodyObj.appPath, 'first appPath').to.equal(originalAppPath1)
            expect(updateAppDataIsValidFalseResponseBodyObj.appPath, 'second appPath').to.equal(originalAppPath2)
            expect(updateAppDataWithoutIsValidFieldResponseBodyObj.appPath, 'third appPath').to.equal(originalAppPath3)

            expect(updateAppDataResponseBodyObj.owner, 'first owner').to.not.equal(oldOwner1)
            expect(updateAppDataIsValidFalseResponseBodyObj.owner, 'second owner').to.not.equal(oldOwner2)
            expect(updateAppDataWithoutIsValidFieldResponseBodyObj.owner, 'third owner').to.not.equal(oldOwner3)
        })
    })
    return context
}

const invalidRequestsForUpdatingAppsTest = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** Update apps feature: Invalid requests for updating new apps', () => {
        describe('Given I have requests with unmodifiable fields when updating apps', () => {
            const appNamePresentRequestBody = {
                appName: `New app ${randomString(4)}`,
                owner: 'test1',
                isValid: true,
            }

            const appPathPresentRequestBody = {
                appPath: '/path/for/testing',
                owner: `test${randomString(4)}`,
            }

            context.session = {
                ...context.session,
                appNamePresentRequestBody: appNamePresentRequestBody,
                appPathPresentRequestBody: appPathPresentRequestBody,
            }
        })

        describe('When I attempt to update apps with existing appIds', () => {
            const updateAppDataResponseBodyObj = JSON.parse(context.session.updateAppDataResponseBody as string)
            const updateAppDataIsValidFalseResponseBodyObj = JSON.parse(context.session.updateAppDataIsValidFalseResponseBody as string)

            const existingAppId1 = updateAppDataResponseBodyObj.appId
            const existingAppId2 = updateAppDataIsValidFalseResponseBodyObj.appId

            const appNamePresentResponse = appDataSteps.updateApp(
                existingAppId1,
                context.session.appNamePresentRequestBody as JSONObject,
            )
            const appPathPresentResponse = appDataSteps.updateApp(
                existingAppId2,
                context.session.appPathPresentRequestBody as JSONObject,
            )

            expect(appNamePresentResponse.status, 'status').to.equal(400)
            expect(appNamePresentResponse).to.have.validJsonBody()

            expect(appPathPresentResponse.status, 'status').to.equal(400)
            expect(appPathPresentResponse).to.have.validJsonBody()

            const appNamePresentResponseBody = appNamePresentResponse.body as string
            const appPathPresentResponseBody = appPathPresentResponse.body as string

            context.session = {
                ...context.session,
                appNamePresentResponseBody: appNamePresentResponseBody,
                appPathPresentResponseBody: appPathPresentResponseBody,
            }
        })

        describe('Then system prevents me from updating apps', () => {
            const appNamePresentResponseBodyObj = JSON.parse(
                context.session.appNamePresentResponseBody as string,
            )
            const appPathPresentResponseBodyObj = JSON.parse(
                context.session.appPathPresentResponseBody as string,
            )

            expect(appNamePresentResponseBodyObj.error, 'not allowed appName error').to.equal("\"appName\" is not allowed")
            expect(appPathPresentResponseBodyObj.error, 'not allowed appPath error').to.equal("\"appPath\" is not allowed")
        })
    })
    return context
}

export const updateAppPositiveFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
) => [updateAppsTest(context, appDataSteps)]

export const updateAppNegativeFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
): IContext[] => [
    invalidRequestsForUpdatingAppsTest(context, appDataSteps)
]
