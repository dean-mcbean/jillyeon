/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// server/api/twitch.js
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4uKhA7X_XlL9qF0x-tcu-6rq988Q_Gns',
  authDomain: 'joypeaapp.firebaseapp.com',
  projectId: 'joypeaapp',
  storageBucket: 'joypeaapp.firebasestorage.app',
  messagingSenderId: '579563108018',
  appId: '1:579563108018:web:d2e6085440523aa16c3bab',
  measurementId: 'G-MGNS8YS4C2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Function to save data to Firebase
const saveDataToFirebase = async (path: string, data: any) => {
  try {
    await set(ref(database, path), data)
    console.log('Data saved successfully')
  }
  catch (error) {
    console.error('Error saving data to Firebase:', error)
  }
}

// Function to get data from Firebase
const getDataFromFirebase = async (path: string) => {
  try {
    const snapshot = await get(child(ref(database), path))
    if (snapshot.exists()) {
      return snapshot.val()
    }
    else {
      console.log('No data available')
      return null
    }
  }
  catch (error) {
    console.error('Error getting data from Firebase:', error)
    return null
  }
}

// Example usage
const examplePath = 'example/path'
const exampleData = { key: 'value' }

saveDataToFirebase(examplePath, exampleData)
getDataFromFirebase(examplePath).then(data => console.log(data))
