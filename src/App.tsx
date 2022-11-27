import './App.scss'

import React, { useEffect } from 'react'

import Router from './router'
import { fireSet } from './utils/firebaseUtil'

function App() {
    // useEffect(() => {
    //     fireSet('hehe', true)
    // }, [])

    return <Router />
}

export default App

// zustand, axios, monaco editor, chart js.
