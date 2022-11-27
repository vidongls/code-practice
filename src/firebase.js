// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCky31Rzw-fBSxv9Z0kvq4pRD1KD7ebcME',
    authDomain: 'codepractice-6317b.firebaseapp.com',
    databaseURL: 'https://codepractice-6317b-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'codepractice-6317b',
    storageBucket: 'codepractice-6317b.appspot.com',
    messagingSenderId: '980818069611',
    appId: '1:980818069611:web:0ef2d2571108086e06092e',
    measurementId: 'G-0WXP1BR9RB',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const firebaseDb = getDatabase(app)
