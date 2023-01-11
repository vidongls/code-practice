import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface INavigator {
    title: string
    navigator?: any[]
}

interface INavigatorState {
    data: INavigator
    setNavigator: (state: INavigator) => void
    getNavigator: () => INavigator
}

const initData = { title: '', navigator: [] }

export const useNavigatorStore = create<INavigatorState>()(
    devtools(
        persist((set, get) => ({
            data: initData,
            setNavigator: (data: INavigator) =>
                set((state: INavigatorState) => ({
                    ...state,
                    data,
                })),
            getNavigator: () => get().data,
        })),
        { name: 'NavigatorStore' }
    )
)
