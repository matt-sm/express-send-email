import api from './api'
import { mailgun, sendgrid } from './services'

jest.mock('./api')

describe('services', async () => {
  test('mailgun', async () => {
    await mailgun()
    expect(api).toBeCalled()
  })

  test('sendgrid', async () => {
    await sendgrid({ to: 'to@example.com', from: 'from@example.com', subject: 'subject', text: 'text' })
    expect(api).toBeCalled()
  })
})
