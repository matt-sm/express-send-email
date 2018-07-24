import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('tiny'))

app.get('/email/:id', (req, res, next) => {
  if (req.params.id === '0') next('route')

  res.send('Hello world')
})

app.get('/email/:id', (req, res, next) => {
  res.send('special')
})
app.listen(4000)
console.log('Listening on port 4000') // eslint-disable-line
