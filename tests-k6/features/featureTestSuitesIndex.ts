import IContext from '@k6/context/IContext'
import AppDataSteps from '@k6/steps/AppDataSteps.js'
import { createAppPositiveFeatureTests, createAppNegativeFeatureTests } from '@k6/features/createAppFeatureTests.js'
import { updateAppPositiveFeatureTests, updateAppNegativeFeatureTests } from '@k6/features/updateAppFeatureTests.js'
import { searchAppPositiveFeatureTests, searchAppNegativeFeatureTests } from '@k6/features/searchAppFeatureTests.js'
import { deleteAppPositiveFeatureTests } from '@k6/features/deleteAppFeatureTests.js'

export const integrationTestsSuite = (
    context: IContext,
    ...steps: object[]
): IContext[] => [
    ...createAppPositiveFeatureTests(context, steps[0] as AppDataSteps),
    ...createAppNegativeFeatureTests(context, steps[0] as AppDataSteps),
    ...updateAppPositiveFeatureTests(context, steps[0] as AppDataSteps),
    ...updateAppNegativeFeatureTests(context, steps[0] as AppDataSteps),
    ...searchAppPositiveFeatureTests(context, steps[0] as AppDataSteps),
    ...searchAppNegativeFeatureTests(context, steps[0] as AppDataSteps),
    ...deleteAppPositiveFeatureTests(context, steps[0] as AppDataSteps),
]

// export const peakTestSuite = ( accessToken: string, ...steps: object[]) => []

// export const soakTestSuite = ( accessToken: string, ...steps: object[]) => []
