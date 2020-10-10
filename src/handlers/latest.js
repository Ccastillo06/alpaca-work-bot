import { getLatestSession, removeSession, updateSessionEndTime } from '../firebase'
import { getHoursWithAddedTime } from '../utils/formatTime'

export const REMOVE_SESSION = 'remove'
export const SUBSTRACT_HOURS = '-'

// Command example: !!latest
export default async function handler(message, args) {
  const { id } = message.author

  const [sessionId, sessionData] = await getLatestSession({ discordId: id })

  const { startTime, endTime, timeSpent, subject } = sessionData
  const start = getHoursWithAddedTime(startTime)
  const end = getHoursWithAddedTime(endTime)

  if (REMOVE_SESSION === args[0]) {
    await removeSession({ sessionId })
    message.reply(
      `has borrado tu última sesión de trabajo. Trabajaste${
        subject ? ` en **${subject}**` : ''
      } desde **${start}** hasta **${end}**`
    )
  } else if (args[0].startsWith(SUBSTRACT_HOURS)) {
    const timeToRemove = args[0].replace(SUBSTRACT_HOURS, '')
    const [hours = '', minutes = '', seconds = ''] = timeToRemove.split(':')

    if (hours.length && minutes.length && seconds.length) {
      const hoursToMs = Number(hours) * 60 * 60 * 1000
      const minutesToMs = Number(minutes) * 60 * 1000
      const secondsToMs = Number(seconds) * 1000
      const msToSubstract = hoursToMs + minutesToMs + secondsToMs

      const newEndTime = endTime - msToSubstract
      const newTimeSpent = timeSpent - msToSubstract

      if (newEndTime > startTime) {
        await updateSessionEndTime({
          sessionId,
          endTime: newEndTime,
          timeSpent: newTimeSpent
        })

        message.reply(
          `¡has actualizado tu última sesión! Empezarías a trabajar a las **${start}** y terminarías a las **${getHoursWithAddedTime(
            newEndTime
          )}** 🚀`
        )
      } else {
        message.reply(
          `según el tiempo que has quitado a tu sesión empezarías a trabajar a las **${start}** y terminarías a las **${getHoursWithAddedTime(
            newEndTime
          )}** 🥴. ¡Inténtalo con el tiempo correcto!`
        )
      }
    } else {
      message.reply(
        `¿has usado el comando correctamente? Para restar horas a tu última sesión envía ${'`!!latest -00:00:00`'} donde cada **00** son las **horas**, **minutos** y **segundos** que quieres quitar ⏰`
      )
    }
  } else {
    message.reply(
      `en tu última sesión trabajaste ${
        subject ? `en **${subject}**` : ''
      } desde **${start}** hasta **${end}**`
    )
  }
}
