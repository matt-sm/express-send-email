import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { home, validator, emailSender, emailSenderFailover, error } from './middleware'

const app = express()
const port = process.env.PORT || 4000

app.use(morgan('combined'))
app.use(bodyParser.json())
app.get('/', home)

app.use(validator)
app.post('/email', emailSender)
app.post('/email', emailSenderFailover)

app.use(error)

app.listen(port)
console.log(`Listening on port ${port}`) // eslint-disable-line
