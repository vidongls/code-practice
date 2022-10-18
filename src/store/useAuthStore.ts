import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import jwt_decode from 'jwt-decode'

interface IToken {
    userId: string
    iat: number
    exp: number
}

interface IUser {
    _id: string
    email: string
    userName: string
    token: string
}

interface IAuthState {
    isLogin: () => boolean
    user: IUser
    login: (user: IUser) => void
}

export const useAuthStore = create<IAuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: { _id: '', email: '', userName: '', token: '' },
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
            }),

            {
                name: 'auth-storage',
            }
        ),
        { name: 'AuthStore' }
    )
)
