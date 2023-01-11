import express from 'express'
import config from './Config'
import routes from './Routes/Index'
import bodyParser from 'body-parser'
import errorHandler from './Middlewares/ErrorHandler'

// init express to serve
const app = express()

// use body parser
app.use(bodyParser.json())

// append api routs
app.use('/api', routes)

// handel error for user
app.use(errorHandler)

// handel 404 request page
app.get(
    '*',
    function (_request: express.Request, response: express.Response): void {
        response.status(404).json({
            status: 'faild',
            error: 'page not found',
        })
    }
)

// leisten to port & run serve
app.listen(config.port, (): void => {
    console.log(`serve is running on port: ${config.port}`)
})

export default app
