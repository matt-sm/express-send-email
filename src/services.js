import api from './api'

export const mailgun = async data => {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN

  if (!apiKey || !domain) {
    throw new Error('Missing Mailgun configuration')
  }

  return api({
    url: `https://api.mailgun.net/v3/${domain}.mailgun.org/messages`,
    method: 'POST',
    auth: {
      username: 'api',
      password: apiKey
    },
    params: data
  })
}

export const sendgrid = async data => {
  const apiKey = process.env.SENDGRID_API_KEY

  if (!apiKey) {
    throw new Error('Missing Sendgrid configuration')
  }

  return api({
    url: `https://api.sendgrid.com/v3/mail/send`,
    headers: { Authorization: `Bearer ${apiKey}` },
    method: 'POST',
    data: {
      personalizations: [{ to: [{ email: data.to }] }],
      from: { email: data.from },
      subject: data.subject,
      content: [{ type: 'text/plain', value: data.text }]
    }
  })
}
