import { ref, get, set, push, remove, update, onValue } from 'firebase/database'
import { firebaseDb } from '../firebase.js'

export const fireGet = (path: string, cb: (data: unknown) => void) => {
    return onValue(
        ref(firebaseDb, path),
        snapshot => {
            const data = snapshot.val()
            cb(data)
        },
        error => {
            console.log(error)
        }
    )
}

export const fireGetUnsubscribe = (path: string, cb: (data: unknown, unsubscribe: any) => void) => {
    const unsubscribe = onValue(
        ref(firebaseDb, path),
        snapshot => {
            const data = snapshot.val()
            cb(data, unsubscribe)
        },
        error => {
            console.log(error)
        }
    )

    return
}

export const fireGetOne = (path: string) => {
    return new Promise((resolve, reject) => {
        onValue(
            ref(firebaseDb, path),
            snapshot => {
                const data = snapshot.val()
                resolve(data)
            },
            error => {
                reject(error)
            },
            { onlyOnce: true }
        )
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
