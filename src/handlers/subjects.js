import { getUserSubjects } from '../firebase'

// Command example: !!subjects
export default async function handler(message, args) {
  const { id } = message.author
  const subjects = await getUserSubjects({ discordId: id })
  const formattedSubjects = subjects.map((subject) => `* ${subject}.`).join('\n')

  message.reply(
    `Estos son los **temas en los que has trabajado** hasta ahora:\n${formattedSubjects}\n¡Seguimos trabajando más que nunca! 🎉`
  )
}
