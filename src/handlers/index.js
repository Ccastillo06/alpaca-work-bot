import help from './help'
import ping from './ping'
import start from './start'
import stop from './stop'
import userDisconnects from './userDisconnects'

export const messageHandlers = {
  help,
  ping,
  start,
  stop
}

export const presenceUpdateHandlers = {
  userDisconnects
}
