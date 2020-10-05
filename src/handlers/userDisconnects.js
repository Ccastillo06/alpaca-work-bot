import { getUserHasWorkingRole, removeWorkingRoleFromUser } from '../utils/roles'
import { getBotsChannelData } from '../utils/channels'
import { finishSession } from '../firebase'

export default async function handler(
  { beforeStatus },
  { afterUserId, afterUsername, afterDiscriminator, afterStatus, afterMember, afterGuild }
) {
  const hasDisconnectedWithWorkingRole = getUserHasWorkingRole(afterMember)

  if (hasDisconnectedWithWorkingRole) {
    const botsChannelData = getBotsChannelData(afterGuild)
    const now = new Date()
    const formattedTimeSpent = await finishSession({
      discordId: afterUserId,
      username: afterUsername,
      discriminator: afterDiscriminator,
      endTime: now.getTime(),
      isFinished: true
    })

    removeWorkingRoleFromUser(afterMember)

    botsChannelData.send(
      `<@${afterUserId}> ha cambiado su status de **${beforeStatus}** a **${afterStatus}** y estaba trabajando 😱. ¡Cerramos su aventura de hoy después de **${formattedTimeSpent}** a tope 🚀!`
    )
  }
}
