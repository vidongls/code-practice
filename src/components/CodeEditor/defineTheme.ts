import { loader } from '@monaco-editor/react'

export const monacoThemes = {
    active4d: 'Active4D',
    'all-hallows-eve': 'All Hallows Eve',
    amy: 'Amy',
    'birds-of-paradise': 'Birds of Paradise',
    blackboard: 'Blackboard',
    'chrome-devtools': 'Chrome DevTools',
    'clouds-midnight': 'Clouds Midnight',
    'espresso-libre': 'Espresso Libre',
    github: 'GitHub',
    idle: 'IDLE',
    'monokai-bright': 'Monokai Bright',
    monokai: 'Monokai',
    'night-owl': 'Night Owl',
    'oceanic-next': 'Oceanic Next',
    'pastels-on-dark': 'Pastels on Dark',
    'slush-and-poppies': 'Slush and Poppies',
    'solarized-dark': 'Solarized-dark',
    'solarized-light': 'Solarized-light',
    idlefingers: 'idleFingers',
    monoindustrial: 'monoindustrial',
}

export type TThemes =
    | 'active4d'
    | 'all-hallows-eve'
    | 'amy'
    | 'birds-of-paradise'
    | 'blackboard'
    | 'chrome-devtools'
    | 'clouds-midnight'
    | 'espresso-libre'
    | 'github'
    | 'idle'
    | 'monokai-bright'
    | 'monokai'
    | 'night-owl'
    | 'oceanic-next'
    | 'pastels-on-dark'
    | 'slush-and-poppies'
    | 'solarized-light'
    | 'idlefingers'
    | 'monoindustrial'

const defineTheme = (theme: TThemes) => {

    return new Promise((res: any) => {
        Promise.all([loader.init(), import(`monaco-themes/themes/${monacoThemes[theme]}.json`)]).then(
            ([monaco, themeData]) => {
                monaco.editor.defineTheme(theme, themeData)
                res()
            }
        )
    })
}

export { defineTheme }
