import Joi from 'joi'
import { mailgun, sendgrid } from './services'

export const home = async (req, res) => {
  res.status(200).send({message: 'ok'})
}

export const validator = async (req, res, next) => {
  const schema = Joi.object().keys({
    to: Joi.string()
      .email()
      .required(),
    from: Joi.string()
      .email()
      .required(),
    subject: Joi.string().required(),
    text: Joi.string().required()
  })

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    next(result.error)
  }

  next()
}

export const emailSender = async (req, res, next) => {
  try {
    await mailgun(req.body)
    res.status(200).send({ message: 'Mailgun email sent' })
  } catch (err) {
    console.error(err)
    next('route')
  }
}

export const emailSenderFailover = async (req, res, next) => {
  try {
    await sendgrid(req.body)
    res.status(200).send({ message: 'Sendgrid email sent' })
  } catch (err) {
    next(err)
  }
}

export const error = (err, req, res, next) => {
  console.error(err)
  res.status(500).send({ error: err.message })
}
