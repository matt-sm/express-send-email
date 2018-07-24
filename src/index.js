import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import sendMailgun from './email'

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.post('/email', async (req, res, next) => {
  try {
    await sendMailgun(req.body)
    res.status(200).send('Email sent')
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res) => {
  console.error(err)
  res.status(500).send(err.message)
})

app.listen(4000)
console.log('Listening on port 4000') // eslint-disable-line
