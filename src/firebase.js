import admin from 'firebase-admin'

import { cleanPayload } from './utils/cleanPayload'
import { getDurationBetweenDates } from './utils/formatTime'

export const workSessionCollection = 'sessions'

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROV_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

const db = admin.firestore()

export const saveNewSession = ({ discordId, username, startTime, isFinished = false, subject }) =>
  db.collection(workSessionCollection).add(
    cleanPayload({
      discordId,
      username,
      startTime,
      isFinished,
      subject
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

    const { miliseconds, formatted } = getDurationBetweenDates(endTime, startTime)

    await db
      .collection(workSessionCollection)
      .doc(id)
      .update(
        cleanPayload({
          endTime,
          isFinished,
          timeSpent: miliseconds
        })
      )

    return formatted
  }
}
