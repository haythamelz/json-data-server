import { Router } from 'express'
import {
    getApps,
    createApp,
    getAppByAppId,
    updateApp,
    deleteApp,
} from '@controllers/appController.js'

const router = Router()

router.get('/app', getApps)
router.get('/app/:appId', getAppByAppId)
router.post('/create-app', createApp)
router.put('/update-app/:appId', updateApp)
router.delete('/delete-app/:appId', deleteApp)

export default router
