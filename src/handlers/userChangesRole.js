import { removeWorkingRoleFromUser, workingRole } from '../utils/roles'
import { getBotsChannelData } from '../utils/channels'
import { finishSession } from '../firebase'
import { offline } from '../utils/status'

export default async function handler(_userBefore, userAfter) {
  const isUserOffline = userAfter.presence.status === offline

  if (isUserOffline) {
    return
  }

  const { user, guild } = userAfter
  const botsChannelData = getBotsChannelData(guild)

  const now = new Date()
  const formattedTimeSpent = await finishSession({
    discordId: userAfter.id,
    username: user.username,
    discriminator: user.discriminator,
    endTime: now.getTime(),
    isFinished: true
  })

  removeWorkingRoleFromUser(userAfter)
  botsChannelData.send(
    `${userAfter} se ha quitado el rol ${workingRole}. ¡Ha estado **${formattedTimeSpent}** a tope 🚀!`
  )
}
