import format from 'date-fns/format'
import addHours from 'date-fns/addHours'

import { getUserHasWorkingRole, addWorkingRoleToUser } from '../utils/roles'
import { saveNewSession } from '../firebase'
import { hoursToAdd } from '../utils/formatTime'

// Command example: !!start
export default async function handler(message, args) {
  if (getUserHasWorkingRole(message.member)) {
    message.reply(`ya estás trabajando! 🤓`)
    return
  }

  const now = new Date()
  const { id, username, discriminator } = message.author

  const subject = args[0].toLowerCase()

  await saveNewSession({
    discordId: id,
    username,
    discriminator,
    startTime: now.getTime(),
    isFinished: false,
    subject
  })

  const hour = format(addHours(now, hoursToAdd), 'HH:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  addWorkingRoleToUser(message.member)
  message.reply(
    `ha empezado a trabajar a las ${hour} de hoy (${day})${
      subject ? ` en **${subject}**` : ''
    }. ¡Mucha suerte en tu aventura! 🚀`
  )
}
