// Command example: !!me
export default async function handler(message) {
  console.log(message.author)
  const { id, username, discriminator } = message.author

  message.reply(
    `tu id de discord es **${id}** y tu username y código son **${username}#${discriminator}**. ¡Puedes usarlos para buscar tus datos en la web de Alpaca Work Bot! 🦙`
  )
}
