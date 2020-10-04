const fetch = require('node-fetch')

const defaultBase = 'USD'
const url = 'https://api.exchangeratesapi.io/latest'

// Command example: !!rates>USD
export default function handler(message, args) {
  const base = (args[0] || '').trim().toUpperCase()
  const urlWithBase = `${url}?base=${base || defaultBase}`

  fetch(urlWithBase)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Invalid request')
      }

      return res.json()
    })
    .then((response) => {
      const { rates } = response
      const entries = Object.entries(rates)
        .map((arr) => arr.join(' = '))
        .join('\n')

      message.reply(`Current Foreign exchange rates: \n${entries}`)
    })
    .catch((err) => {
      console.log(err.message)
      message.reply('Rates API is currently unavailable...')
    })
}
