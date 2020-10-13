import { removeSessionWithUserId } from '../firebase'

// Command example: !!remove
export default async function handler(message, args) {
  const { id } = message.author
  const sessionId = args[0]

  if (!sessionId) {
    message.reply(`¡recuerda enviar una **ID correcta** para poder borrar tu sesión! 🆔`)
  } else {
    try {
      await removeSessionWithUserId({ sessionId, userId: id })
      message.reply(`has borrado la sesión de trabajo con ID **${sessionId}** 💣💥`)
    } catch (err) {
      message.reply(`¡La sesión con la ID enviada no es tuya, **¡no puedes borrarla!** 🦙👮‍♂️`)
    }
  }
}
