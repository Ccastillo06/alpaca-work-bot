import { format } from 'date-fns'

import { getUserHasWorkingRole, addWorkingRoleToUser } from '../utils/roles'
import { saveNewSession } from '../firebase'

// Command example: !!start
export default async function handler(message, args) {
  if (getUserHasWorkingRole(message.member)) {
    message.reply(`ya estás trabajando! 🤓`)
    return
  }

  const now = new Date()
  const { id, username } = message.author
  const subject = args[0]
  
  await saveNewSession({
    discordId: id,
    username,
    startTime: now.getTime(),
    isFinished: false,
    subject
  })

  const hour = format(now, 'HH:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  addWorkingRoleToUser(message.member)
  message.reply(
    `ha empezado a trabajar a las ${hour} de hoy (${day})${
      subject ? ` en **${subject}**` : ''
    }. ¡Mucha suerte en tu aventura! 🚀`
  )
}
