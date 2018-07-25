import { validator, emailSender } from './middleware'
import { mailgun } from './services'

jest.mock('./services')

describe('validation', async () => {
  test('valid request', async () => {
    const nextMock = jest.fn()
    const body = { to: 'to@example.com', from: 'from@example.com', subject: 'subject', text: 'text' }

    await validator({ body }, null, nextMock)
    expect(nextMock).toBeCalled()
  })

  test('invalid to email', async () => {
    const nextMock = jest.fn()
    const body = { to: 'to', from: 'from@example.com', subject: 'subject', text: 'text' }

    await validator({ body }, null, nextMock)
    expect(nextMock.mock.calls[0][0].message).toMatch(/\"to\" must be a valid email/)
  })

  test('invalid from email', async () => {
    const nextMock = jest.fn()
    const body = { to: 'to@example.com', from: 'from', subject: 'subject', text: 'text' }

    await validator({ body }, null, nextMock)
    expect(nextMock.mock.calls[0][0].message).toMatch(/\"from\" must be a valid email/)
  })

  test('required to email', async () => {
    const nextMock = jest.fn()
    const body = { from: 'from@example', subject: 'subject', text: 'text' }

    await validator({ body }, null, nextMock)
    expect(nextMock.mock.calls[0][0].message).toMatch(/\"to\" is required/)
  })

  test('required from email', async () => {
    const nextMock = jest.fn()
    const body = { to: 'to@example.com', subject: 'subject', text: 'text' }

    await validator({ body }, null, nextMock)
    expect(nextMock.mock.calls[0][0].message).toMatch(/\"from\" is required/)
  })
})

describe('emailSender', async () => {
  test('valid email returns 200', async () => {
    const statusMock = jest.fn()
    const sendMock = jest.fn()
    const nextMock = jest.fn()

    const res = { status: statusMock, send: sendMock }
    statusMock.mockImplementation(() => res)
    sendMock.mockImplementation(() => res)

    await emailSender({ body: {} }, res, nextMock)
    expect(statusMock).toBeCalledWith(200)
    expect(nextMock).not.toBeCalled()
  })

  test('failed send calls next middleware', async () => {
    const nextMock = jest.fn()
    mailgun.mockImplementation(() => {
      throw new Error()
    })
    await emailSender({ body: {} }, null, nextMock)
    expect(nextMock).toBeCalledWith('route')
  })
})
