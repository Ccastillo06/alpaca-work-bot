import 'babel-polyfill'
import './dotenv'
import './server'

import Discord from 'discord.js'

import { messageHandlers, presenceUpdateHandlers, guildMemberUpdateHandlers } from './handlers'
import { parseCommandAndArgs, prefix } from './utils/message'
import { hasUserDisconnected, offline } from './utils/status'
import { getUserHasWorkingRole } from './utils/roles'

const client = new Discord.Client()

// Listen to user messages in channel
client.on('message', function (message) {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  // if (message.member.user.presence.status === offline) return

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
    user: { username: afterUsername, discriminator: afterDiscriminator },
    status: afterStatus,
    member: afterMember,
    guild: afterGuild
  } = userAfter

  if (hasUserDisconnected(beforeStatus, afterStatus)) {
    presenceUpdateHandlers.userDisconnects(
      { beforeStatus },
      { afterUserId, afterUsername, afterDiscriminator, afterStatus, afterMember, afterGuild }
    )
  }
})

client.on('guildMemberUpdate', (userBefore, userAfter) => {
  const hasStoppedWorking = getUserHasWorkingRole(userBefore) && !getUserHasWorkingRole(userAfter)

  if (hasStoppedWorking) {
    guildMemberUpdateHandlers.userChangesRole(userBefore, userAfter)
  }
})

client.login(process.env.BOT_TOKEN).then(() => {
  console.log('Connected to Discord')
})
