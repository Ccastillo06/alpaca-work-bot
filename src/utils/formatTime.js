import format from 'date-fns/format'
import addHours from 'date-fns/addHours'
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import getSeconds from 'date-fns/getSeconds'

export const hoursToAdd = process.env.HOURS_TO_ADD || 0
export const getHoursWithAddedTime = (ms) => format(addHours(new Date(ms), hoursToAdd), 'HH:mm:ss')

const normalizeTime = (time) => (time.length === 1 ? `0${time}` : time)

const MINUTES_IN_HOUR = 60

export const getDurationBetweenDates = (latestDate, oldestDate) => {
  const timeInMilliseconds = latestDate - oldestDate

  const date = new Date(timeInMilliseconds)
  const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR
  const dateWithoutTimezoneDiff = addHours(date, timezoneDiff)

  const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)))
  const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)))
  const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)))
  const hoursOutput = `${hours}:`

  return {
    formatted: `${hoursOutput}${minutes}:${seconds}`,
    miliseconds: timeInMilliseconds
  }
}
