export const prefix = '!!'
export const argsDivider = ' '
export const argsAfterDivider = '>'

const splitArgs = (args) => (args || '').split(',').map((el) => el.trim())

// Parse received messages to retun the command and the arguments in an array
export const parseCommandAndArgs = (message) => {
  // From !!choose tortilla,pizza,burguer => choose tortilla,pizza,burguer
  const userMessage = message.content.replace(prefix, '').trim()

  // From choose tortilla,pizza,burguer => [choose, 'tortilla,pizza,burguer']
  const [command, args] = userMessage.replace(argsDivider, argsAfterDivider).split(argsAfterDivider)

  return [command.toLowerCase(), splitArgs(args)] // [choose, [tortilla, pizza, burguer]]
}
