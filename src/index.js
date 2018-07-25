import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { validate, sendEmail, sendEmailFailover, error } from './middleware'

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(validate)

app.post('/email', sendEmail)
app.post('/email', sendEmailFailover)

app.use(error)

app.listen(4000)
console.log('Listening on port 4000') // eslint-disable-line
