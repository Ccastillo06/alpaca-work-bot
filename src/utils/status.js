export const online = 'online'
export const idle = 'idle'
export const doNotDisturb = 'dnd'
export const offline = 'offline'

export const hasUserDisconnected = (beforeStatus, afterStatus) =>
  (beforeStatus === online || beforeStatus === doNotDisturb || beforeStatus === idle) &&
  afterStatus === offline
