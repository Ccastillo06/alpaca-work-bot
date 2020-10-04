import 'babel-polyfill'
import './dotenv'
import Discord from 'discord.js'

import { messageHandlers, presenceUpdateHandlers } from './handlers'
import { parseCommandAndArgs, prefix } from './utils/message'
import { hasUserDisconnected } from './utils/status'

const client = new Discord.Client()

// Listen to user messages in channel
client.on('message', function (message) {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const [command, args] = parseCommandAndArgs(message)

  const handler = messageHandlers[command]
  if (handler) {
    handler(message, args)
  }
})

// When user disconnects, connects, goes idle or to do not disturb modes
client.on('presenceUpdate', (userBefore = {}, userAfter = {}) => {
  const { status: beforeStatus } = userBefore
  const {
    userID: afterUserId,
    user: { username: afterUsername },
    status: afterStatus,
    member: afterMember,
    guild: afterGuild
  } = userAfter

  if (hasUserDisconnected(beforeStatus, afterStatus)) {
    presenceUpdateHandlers.userDisconnects(
      { beforeStatus },
      { afterUserId, afterUsername, afterStatus, afterMember, afterGuild }
    )
  }
})

// // Listen to user role changes (eg. Admin => SuperAdmin)
// client.on('guildMemberUpdate', (_guild, memberUpdated) => {
//   console.log('member updated', memberUpdated)
// })

client.login(process.env.BOT_TOKEN)
