import { ref, get, set, push, remove, update, onValue } from 'firebase/database'
import { firebaseDb } from '../firebase.js'

export const fireGet = (path: string, cb: (data: unknown) => void) => {
    onValue(ref(firebaseDb, path), snapshot => {
        const data = snapshot.val()
        cb(data)
    })
}

export const fireSet = async (path: string, data: unknown) => {
    const response = await set(ref(firebaseDb, path), data)
    return response
}

export const firePush = async (path: string, data?: unknown) => {
    const response = await push(ref(firebaseDb, path), data)
    return response
}

export const fireUpdate = async (path: string, data: object) => {
    const response = await update(ref(firebaseDb, path), data)
    return response
}

export const fireDelete = async (path: string) => {
    const response = await remove(ref(firebaseDb, path))
    return response
}

/*
 */
