import ping from './ping'
import start from './start'
import stop from './stop'
import userDisconnects from './userDisconnects'

export const messageHandlers = {
  ping,
  start,
  stop
}

export const presenceUpdateHandlers = {
  userDisconnects
}
