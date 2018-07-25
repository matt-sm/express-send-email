A simple api to send an email via Mailgun with a Sendgrid fallback.

A sample app is running at https://sends-emails.herokuapp.com.

## Install:
`npm i`
## Run
- run locally with nodemon + babel: `npm run dev`
- build and run on a server: `npm start`
- format code: `npm run prettier`
- lint code: `npm run eslint`
- tests: `npm test`

## API
### Send Email
----
  Sends a single email

* **URL**

  /email

* **Method:**

  `POST`
  
* **Data Params**

   **Required:**
 
   `{"from": "example@example.com", "to": "example@example.com", "subject": "text", "text": "text"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Email sent" }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ "error" : "error message" }`

## Notes:
- running babel for `import` and `...` support

## TODO:
The following were not completed due to time constraints:
- implement CC, BCC and multiple recipients
- add more unit/integration tests
- use a logging package eg. Winston
