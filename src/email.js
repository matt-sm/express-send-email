import Joi from 'joi'
import api from './api'

const sendMailgun = async data => {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN

  if (!apiKey || !domain) {
    throw new Error('Missing Mailgun configuration')
  }

  const schema = Joi.object().keys({
    to: Joi.string()
      .email()
      .required(),
    subject: Joi.string().required(),
    text: Joi.string().required()
  })

  const result = Joi.validate(data, schema)

  if (result.error) {
    throw result.error
  }

  return api({
    url: `https://api.mailgun.net/v3/${domain}.mailgun.org/messages`,
    method: 'POST',
    auth: {
      username: 'api',
      password: apiKey
    },
    params: { from: `Mailgun Sandbox <postmaster@${domain}.mailgun.org>`, ...data }
  })
}

export default sendMailgun
