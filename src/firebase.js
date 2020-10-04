import admin from 'firebase-admin'
import { differenceInMinutes } from 'date-fns'

import serviceAccount from '../firebase-config.json'
import { cleanPayload } from './utils/cleanPayload'

export const workSessionCollection = 'sessions'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

const db = admin.firestore()

export const saveNewSession = ({ discordId, username, startTime, isFinished = false }) =>
  db.collection(workSessionCollection).add(
    cleanPayload({
      discordId,
      username,
      startTime,
      isFinished
    })
  )

export const finishSession = async ({ discordId, username, endTime, isFinished = true }) => {
  const sessionRef = await db
    .collection(workSessionCollection)
    .where('discordId', '==', discordId)
    .where('username', '==', username)
    .where('isFinished', '==', false)
    .limit(1) // This is due to users having only one session at a time
    .get()

  if (!sessionRef.empty) {
    const doc = sessionRef.docs[0]
    const { id } = doc
    const { startTime } = doc.data()

    const timeSpent = new Date(endTime) - new Date(startTime)

    const minutes = differenceInMinutes(new Date(endTime), new Date(startTime))

    await db.collection(workSessionCollection).doc(id).update(
      cleanPayload({
        endTime,
        isFinished,
        timeSpent
      })
    )

    // @TODO Return time correctly formatted
    return minutes
  }
}
