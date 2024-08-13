import ISettings from '@k6/env/ISettings'
import IContext from '@k6/context/IContext'
import AppDataSteps from '@k6/steps/AppDataSteps.js'
import { Options } from 'k6/options'
import { integrationTestsSuite } from '@k6/features/featureTestSuitesIndex.js'

class Startup {
    readonly k6OptionsFile: Options
    readonly envSettings: ISettings
    readonly testsToRun = {} as { (context: IContext): IContext[] }

    constructor() {
        let environment: string = 'local'
        let optionsSet: string = 'integration'

        if (__ENV.EXECUTION) {
            environment = __ENV.EXECUTION
        }

        if (__ENV.OPTIONS_SET) {
            optionsSet = __ENV.OPTIONS_SET
        }

        this.k6OptionsFile = JSON.parse(
            open(
                `../../../tests-k6/env/${environment}/config.${optionsSet}.json`,
            ),
        )
        this.envSettings = JSON.parse(
            open(`../../../tests-k6/env/${environment}/settings.json`),
        )

        //steps
        const appDataSteps = new AppDataSteps(this.envSettings)

        //test runner config
        if (optionsSet === 'integration') {
            this.testsToRun = (context: IContext): IContext[] =>
                integrationTestsSuite(context, appDataSteps)
        }
    }
}

export default new Startup()
