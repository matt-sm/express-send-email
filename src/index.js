import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('tiny'))

app.post('/email', (req, res, next) => {
  res.send('Hello world')
})

app.listen(4000)
console.log('Listening on port 4000') // eslint-disable-line
