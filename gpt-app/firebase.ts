import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCW6xcgRMKaI9pYa3X7n9SrByajTzHBlTw',
  authDomain: 'chat-gpt-app-1a9e8.firebaseapp.com',
  projectId: 'chat-gpt-app-1a9e8',
  storageBucket: 'chat-gpt-app-1a9e8.appspot.com',
  messagingSenderId: '915702271224',
  appId: '1:915702271224:web:d08b8b1ecf087bac67bf0d',
  measurementId: 'G-4L6P70XBV4',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
