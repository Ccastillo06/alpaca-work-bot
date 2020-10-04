import { format } from 'date-fns'

import { getUserHasWorkingRole, removeWorkingRoleFromUser } from '../utils/roles'

// Command example: !!stop
export default function handler(message) {
  if (!getUserHasWorkingRole(message)) {
    message.reply(`no estás trabajando todavía! 😴`)
    return
  }

  const now = new Date()
  const hour = format(now, 'hh:mm:ss')
  const day = format(now, 'dd-MM-yyyy')

  // @TODO Add user data to database...
  // const { id, username } = message.author
  removeWorkingRoleFromUser(message)
  message.reply(`ha terminado a trabajar a las ${hour} de hoy (${day}). ¿Ha sido un rato productivo? 🐂`)
}
