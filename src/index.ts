import express from 'express'
import cors from 'cors'
import appRoutes from '@routes/appRoutes.js'

const app = express()
app.use(express.json())
app.use(cors<cors.CorsRequest>())
app.use('/json-data', appRoutes)

const port = 80

app.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`)
})
