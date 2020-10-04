import { format } from 'date-fns'

import { getUserHasWorkingRole, addWorkingRoleToUser } from '../utils/roles'
import { saveNewSession } from '../firebase'

// Command example: !!start
export default async function handler(message) {
  if (getUserHasWorkingRole(message)) {
    message.reply(`ya estás trabajando! 🤓`)
    return
  }

  const now = new Date()
  const { id, username } = message.author

  await saveNewSession({
    discordId: id,
    username,
    startTime: now.getTime(),
    isFinished: false
  })

  const hour = format(now, 'HH:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  addWorkingRoleToUser(message)
  message.reply(
    `ha empezado a trabajar a las ${hour} de hoy (${day}). ¡Mucha suerte en tu aventura! 🚀`
  )
}
