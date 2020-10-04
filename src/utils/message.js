export const prefix = '!!'
export const argsDivider = '>'

const splitArgs = (args) => (args || '').split(',')

// Parse received messages to retun the command and the arguments in an array
export const parseCommandAndArgs = (message) => {
  // From !!choose>tortilla,pizza,burguer => choose>tortilla,pizza,burguer
  const userMessage = message.content.replace(prefix, '').trim().toLowerCase()
  // From choose>tortilla,pizza,burguer => [choose, 'tortilla,pizza,burguer']
  const [command, args] = userMessage.split(argsDivider)

  return [command, splitArgs(args)] // [choose, [tortilla, pizza, burguer]]
}
