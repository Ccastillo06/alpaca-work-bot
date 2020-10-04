import format from 'date-fns/format'
import addHours from 'date-fns/addHours'

import { getUserHasWorkingRole, removeWorkingRoleFromUser } from '../utils/roles'
import { finishSession } from '../firebase'
import { hoursToAdd } from '../utils/formatTime'

// Command example: !!stop
export default async function handler(message) {
  if (!getUserHasWorkingRole(message.member)) {
    message.reply(`no estás trabajando todavía! 😴`)
    return
  }

  const now = new Date()
  const { id, username, discriminator } = message.author

  const formattedTimeSpent = await finishSession({
    discordId: id,
    username,
    discriminator,
    endTime: now.getTime(),
    isFinished: true
  })

  const hour = format(addHours(now, hoursToAdd), 'HH:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  removeWorkingRoleFromUser(message.member)
  message.reply(
    `ha terminado a trabajar a las ${hour} de hoy (${day}), un total de **${formattedTimeSpent}**. ¿Ha sido un rato productivo? 🐂`
  )
}
