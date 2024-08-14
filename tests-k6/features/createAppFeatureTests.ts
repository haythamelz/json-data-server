import IContext from '@k6/context/IContext'
/* @ts-expect-error: Testing library */
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js'
/* @ts-expect-error: Testing library */
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import AppDataSteps from '@k6/steps/AppDataSteps.js'
import { JSONObject } from 'k6'

const createNewAppsTest = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** New app feature: Create new apps', () => {
        describe('Given I have all details necessary for creating valid apps', () => {
            const appDataRequestBody = {
                appName: `New app ${randomString(4)}`,
                appPath: `/path/for/testing/${randomString(4)}`,
                owner: 'test1',
                isValid: true,
            }

            const appDataIsValidFalseRequestBody = {
                appName: `New app ${randomString(4)}`,
                appPath: `/path/for/testing/${randomString(4)}`,
                owner: `test${randomString(4)}`,
                isValid: false,
            }

            const appDataWithoutIsValidFieldRequestBody = {
                appName: `New app ${randomString(4)}`,
                appPath: `/path/for/testing/${randomString(4)}`,
                owner: `test${randomString(4)}`
            }

            context.session = {
                appDataRequestBody: appDataRequestBody,
                appDataIsValidFalseRequestBody: appDataIsValidFalseRequestBody,
                appDataWithoutIsValidFieldRequestBody: appDataWithoutIsValidFieldRequestBody,
            }
        })

        describe('When I create apps', () => {
            const createAppResponse = appDataSteps.createApp(
                context.session.appDataRequestBody as JSONObject,
            )
            const createAppIsValidFalseResponse = appDataSteps.createApp(
                context.session.appDataIsValidFalseRequestBody as JSONObject,
            )

            const createAppWithoutIsValidFieldResponse = appDataSteps.createApp(
                context.session.appDataWithoutIsValidFieldRequestBody as JSONObject,
            )

            expect(createAppResponse.status, 'status').to.equal(201)
            expect(createAppResponse).to.have.validJsonBody()

            expect(createAppIsValidFalseResponse.status, 'status').to.equal(201)
            expect(createAppIsValidFalseResponse).to.have.validJsonBody()

            expect(createAppWithoutIsValidFieldResponse.status, 'status').to.equal(201)
            expect(createAppWithoutIsValidFieldResponse).to.have.validJsonBody()

            const createAppResponseBody = createAppResponse.body as string
            const createAppIsValidFalseResponseBody = createAppIsValidFalseResponse.body as string
            const createAppWithoutIsValidFieldResponseBody = createAppWithoutIsValidFieldResponse.body as string

            context.session = {
                ...context.session,
                createAppResponseBody: createAppResponseBody,
                createAppIsValidFalseResponseBody: createAppIsValidFalseResponseBody,
                createAppWithoutIsValidFieldResponseBody: createAppWithoutIsValidFieldResponseBody
            }
        })

        describe('Then new apps are created with correct information', () => {
            const appDataRequestBody = context.session.appDataRequestBody as JSONObject
            const appDataIsValidFalseRequestBody = context.session.appDataIsValidFalseRequestBody as JSONObject
            const appDataWithoutIsValidFieldRequestBody = context.session.appDataWithoutIsValidFieldRequestBody as JSONObject


            const createAppResponseBodyObj = JSON.parse(
                context.session.createAppResponseBody as string,
            )
            const createAppIsValidFalseResponseBodyObj = JSON.parse(
                context.session.createAppIsValidFalseResponseBody as string,
            )

            const createAppWithoutIsValidFieldResponseBodyObj = JSON.parse(
                context.session.createAppWithoutIsValidFieldResponseBody as string,
            )

            const firstAppAppId = createAppResponseBodyObj.appId
            const firstAppAppName = createAppResponseBodyObj.appName
            const firstAppAppPath = createAppResponseBodyObj.appPath
            const firstAppOwner = createAppResponseBodyObj.owner
            const firstAppIsValid = createAppResponseBodyObj.isValid

            const secondAppAppId = createAppIsValidFalseResponseBodyObj.appId
            const secondAppAppName = createAppIsValidFalseResponseBodyObj.appName
            const secondAppAppPath = createAppIsValidFalseResponseBodyObj.appPath
            const secondAppOwner = createAppIsValidFalseResponseBodyObj.owner
            const secondAppIsValid = createAppIsValidFalseResponseBodyObj.isValid

            const thirdAppAppId = createAppWithoutIsValidFieldResponseBodyObj.appId
            const thirdAppAppName = createAppWithoutIsValidFieldResponseBodyObj.appName
            const thirdAppAppPath = createAppWithoutIsValidFieldResponseBodyObj.appPath
            const thirdAppOwner = createAppWithoutIsValidFieldResponseBodyObj.owner
            const thirdAppIsValid = createAppWithoutIsValidFieldResponseBodyObj.isValid

            expect(firstAppAppId.length > 0, 'first appId should not be empty').to.be.true
            expect(firstAppAppName, 'first appName').to.equal(appDataRequestBody.appName)
            expect(firstAppAppPath, 'first appPath').to.equal(appDataRequestBody.appPath)
            expect(firstAppOwner, 'first owner').to.equal(appDataRequestBody.owner)
            expect(firstAppIsValid, 'first isValid').to.equal(appDataRequestBody.isValid)

            expect(secondAppAppId.length > 0, 'second appId should not be empty').to.be.true
            expect(secondAppAppName, 'second appName').to.equal(appDataIsValidFalseRequestBody.appName)
            expect(secondAppAppPath, 'second appPath').to.equal(appDataIsValidFalseRequestBody.appPath)
            expect(secondAppOwner, 'second owner').to.equal(appDataIsValidFalseRequestBody.owner)
            expect(secondAppIsValid, 'second isValid').to.equal(appDataIsValidFalseRequestBody.isValid)

            expect(thirdAppAppId.length > 0, 'third appId should not be empty').to.be.true
            expect(thirdAppAppName, 'third appName').to.equal(appDataWithoutIsValidFieldRequestBody.appName)
            expect(thirdAppAppPath, 'third appPath').to.equal(appDataWithoutIsValidFieldRequestBody.appPath)
            expect(thirdAppOwner, 'third owner').to.equal(appDataWithoutIsValidFieldRequestBody.owner)
            expect(thirdAppIsValid, 'third isValid').to.be.false
        })
    })
    return context
}

const invalidRequestsForNewAppTest = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** New app feature: Invalid requests for creating new apps', () => {
        describe('Given I have requests with missing fields when creating apps', () => {
            const missingAppNameRequestBody = {
                appPath: '/path/for/testing',
                owner: 'test1',
                isValid: true,
            }

            const missingAppPathRequestBody = {
                appName: `New app ${randomString(4)}`,
                owner: `test${randomString(4)}`,
                isValid: false,
            }

            const missingOwnerRequestBody = {
                appName: `New app ${randomString(4)}`,
                appPath: '/path/for/testing',
            }

            context.session = {
                ...context.session,
                missingAppNameRequestBody: missingAppNameRequestBody,
                missingAppPathRequestBody: missingAppPathRequestBody,
                missingOwnerRequestBody: missingOwnerRequestBody,
            }
        })

        describe('When I attempt to create apps', () => {
            const missingAppNameResponse = appDataSteps.createApp(
                context.session.missingAppNameRequestBody as JSONObject,
            )
            const missingAppPathResponse = appDataSteps.createApp(
                context.session.missingAppPathRequestBody as JSONObject,
            )

            const missingOwnerReponse = appDataSteps.createApp(
                context.session.missingOwnerRequestBody as JSONObject,
            )

            expect(missingAppNameResponse.status, 'status').to.equal(400)
            expect(missingAppNameResponse).to.have.validJsonBody()

            expect(missingAppPathResponse.status, 'status').to.equal(400)
            expect(missingAppPathResponse).to.have.validJsonBody()

            expect(missingOwnerReponse.status, 'status').to.equal(400)
            expect(missingOwnerReponse).to.have.validJsonBody()

            const missingAppNameResponseBody = missingAppNameResponse.body as string
            const missingAppPathResponseBody = missingAppPathResponse.body as string
            const missingOwnerReponseBody = missingOwnerReponse.body as string

            context.session = {
                ...context.session,
                missingAppNameResponseBody: missingAppNameResponseBody,
                missingAppPathResponseBody: missingAppPathResponseBody,
                missingOwnerReponseBody: missingOwnerReponseBody
            }
        })

        describe('Then system prevents me from creating new apps', () => {
            const missingAppNameResponseBodyObj = JSON.parse(
                context.session.missingAppNameResponseBody as string,
            )
            const missingAppPathResponseBodyObj = JSON.parse(
                context.session.missingAppPathResponseBody as string,
            )

            const missingOwnerReponseBodyObj = JSON.parse(
                context.session.missingOwnerReponseBody as string,
            )

            expect(missingAppNameResponseBodyObj.error, 'missing appName error').to.equal("\"appName\" is required")
            expect(missingAppPathResponseBodyObj.error, 'missing appName error').to.equal("\"appPath\" is required")
            expect(missingOwnerReponseBodyObj.error, 'missing appName error').to.equal("\"owner\" is required")
        })
    })
    return context
}

export const createAppPositiveFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
) => [createNewAppsTest(context, appDataSteps)]

export const createAppNegativeFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
): IContext[] => [
    invalidRequestsForNewAppTest(context, appDataSteps)
]
