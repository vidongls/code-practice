import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import jwt_decode from 'jwt-decode'
import UserApi from '../Api/User/UserApi'

interface IToken {
    userId: string
    iat: number
    exp: number
}

interface IUser {
    id: string
    email: string
    userName: string
    token: string
    role: string
}

interface IAuthState {
    isLogin: () => boolean
    user: IUser
    login: (user: IUser) => void
    logout: () => void
    getToken: () => string
    getUser: () => IUser
}

const initUser = { id: '', email: '', userName: '', token: '', role: '' }

export const useAuthStore = create<IAuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: initUser,
                isLogin: () => {
                    const token = get().user.token
                    if (!token) {
                        return false
                    }

                    const decode: IToken = jwt_decode(token)

                    if (Date.now() >= decode.exp * 1000) {
                        return false
                    }

                    return true
                },
                login: (user: IUser) =>
                    set((state: IAuthState) => ({
                        ...state,
                        user,
                    })),
                logout: () =>
                    set((state: IAuthState) => {
                        return { user: initUser }
                    }),
                getToken: () => get().user.token,
                getUser: () => get().user,
            }),
            {
                name: 'auth-storage',
            }
        ),
        { name: 'AuthStore' }
    )
)
