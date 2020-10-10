import help from './help'
import ping from './ping'
import start from './start'
import stop from './stop'
import me from './me'
import userDisconnects from './userDisconnects'
import userChangesRole from './userChangesRole'

export const messageHandlers = {
  help,
  ping,
  start,
  stop,
  me
}

export const presenceUpdateHandlers = {
  userDisconnects
}

export const guildMemberUpdateHandlers = {
  userChangesRole
}
