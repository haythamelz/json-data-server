import IContext from '@k6/context/IContext'
/* @ts-expect-error: Testing library */
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js'
import AppDataSteps from '@k6/steps/AppDataSteps.js'

const deleteUpdatedApps = (context: IContext, appDataSteps: AppDataSteps) => {
    describe('*** Delete apps feature: Delete apps', () => {
        describe('Given I have appIds after updating apps', () => {
            const updateAppDataResponseBodyObj = JSON.parse(context.session.updateAppDataResponseBody as string)
            const updateAppDataIsValidFalseResponseBodyObj = JSON.parse(context.session.updateAppDataIsValidFalseResponseBody as string)
            const updateAppDataWithoutIsValidFieldResponseBodyObj = JSON.parse(context.session.updateAppDataWithoutIsValidFieldResponseBody as string)

            const updatedAppId1 = updateAppDataResponseBodyObj.appId
            const updatedAppId2 = updateAppDataIsValidFalseResponseBodyObj.appId
            const updatedAppId3 = updateAppDataWithoutIsValidFieldResponseBodyObj.appId

            context.session = {
                ...context.session,
                updatedAppIds: [ updatedAppId1, updatedAppId2, updatedAppId3]
            }
        })

        describe('When I delete updated apps', () => {
            const updatedAppIds = context.session.updatedAppIds as string[]

            updatedAppIds.forEach(appId =>{
                const deleteAppResponse = appDataSteps.deleteApp(appId)

                expect(deleteAppResponse.status, 'status').to.equal(200)
            })
        })

        describe('Then I unable to seach for deleted apps', () => {
            const deletedAppIds = context.session.updatedAppIds as string[]

            deletedAppIds.forEach(appId =>{
                const deleteAppResponse = appDataSteps.getApps(appId)

                expect(deleteAppResponse.status, 'status').to.equal(404)
            })
        })
    })
    return context
}

export const deleteAppPositiveFeatureTests = (
    context: IContext,
    appDataSteps: AppDataSteps,
) => [deleteUpdatedApps(context, appDataSteps)]