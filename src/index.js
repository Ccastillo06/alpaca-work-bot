import 'babel-polyfill'
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

// when user disconnects, connects...
client.on('presenceUpdate', (_userBefore, userAfter) => {
  console.log('userAfter:', userAfter)
  console.log(userAfter.userID, userAfter.status)
  console.log(userAfter.member.roles.cache.map(role => role.name))
})

// when updating roles...
client.on('guildMemberUpdate', (_guild, memberUpdated) => {
  console.log('member updated', memberUpdated)
  // console.log(memberUpdated.roles.cache.find(role => role.name === 'Trabajando'))
})

client.login(process.env.BOT_TOKEN)
