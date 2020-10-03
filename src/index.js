import './dotenv'
import Discord from 'discord.js'

import handlers from './handlers'
import { parseCommandAndArgs, prefix } from './utils/message'

const client = new Discord.Client()

client.on('message', function (message) {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const [command, args] = parseCommandAndArgs(message)

  const handler = handlers[command]
  if (handler) {
    handler(message, args)
  }
})

client.login(process.env.BOT_TOKEN)
