// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "codepractice-6317b.firebaseapp.com",
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: "codepractice-6317b",
	storageBucket: "codepractice-6317b.appspot.com",
	messagingSenderId: "980818069611",
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const firebaseDb = getDatabase(app)
