// Command example: !!choose>tortilla,croquetas,pizza
export default function handler(message, args) {
  const randomIndex = Math.floor(Math.random() * args.length)

  message.reply(`I choose the random option ${args[randomIndex]}. 🦄`)
}
