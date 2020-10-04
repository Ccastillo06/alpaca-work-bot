import { format } from 'date-fns'

import { getUserHasWorkingRole, addWorkingRoleToUser } from '../utils/roles'

// Command example: !!start
export default function handler(message) {
  if (getUserHasWorkingRole(message)) {
    message.reply(`ya estás trabajando! 🤓`)
    return
  }

  const now = new Date()
  const hour = format(now, 'hh:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  // @TODO Add user data to database...
  // const { id, username } = message.author
  addWorkingRoleToUser(message)
  message.reply(`ha empezado a trabajar a las ${hour} de hoy (${day}). ¡Mucha suerte en tu aventura! 🚀`)
}
