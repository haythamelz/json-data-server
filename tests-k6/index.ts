import Startup from '@k6/container/Startup.js'
import IContext from '@k6/context/IContext'
import { Options } from 'k6/options'

export const options: Options = Startup.k6OptionsFile

export const setup = (): IContext => ({
    session: { response: '' },
})

export default (context: IContext) => Startup.testsToRun(context)[0]
