import { format } from 'date-fns'

import { getUserHasWorkingRole, removeWorkingRoleFromUser } from '../utils/roles'
import { finishSession } from '../firebase'

// Command example: !!stop
export default async function handler(message) {
  if (!getUserHasWorkingRole(message)) {
    message.reply(`no estás trabajando todavía! 😴`)
    return
  }

  const now = new Date()
  const { id, username } = message.author

  const formattedTimeSpent = await finishSession({
    discordId: id,
    username,
    endTime: now.getTime(),
    isFinished: true
  })

  const hour = format(now, 'HH:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  removeWorkingRoleFromUser(message)
  message.reply(
    `ha terminado a trabajar a las ${hour} de hoy (${day}), un total de **${formattedTimeSpent}**. ¿Ha sido un rato productivo? 🐂`
  )
}
