import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDLshCjr8dj15u7Dj-eyKNHZF0yJ8OMUm8",
  authDomain: "janmashtami-game.firebaseapp.com",
  projectId: "janmashtami-game",
  storageBucket: "janmashtami-game.firebasestorage.app",
  messagingSenderId: "491144554150",
  appId: "1:491144554150:web:67b60bef6d1f721aeab667"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export async function signInAnon() {
  if (!auth.currentUser) {
    await signInAnonymously(auth)
  }
}
