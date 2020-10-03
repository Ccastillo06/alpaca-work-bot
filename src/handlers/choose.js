// Command example: !!choose>tortilla,croquetas,pizza
function handler(message, args) {
  const randomIndex = Math.floor(Math.random() * args.length)

  message.reply(`I choose the random option ${args[randomIndex]}. 🦄`)
}

module.exports = handler
