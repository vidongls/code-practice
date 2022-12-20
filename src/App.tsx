import './App.scss'

import React, { useEffect } from 'react'

import Router from './router'
import { fireSet } from './utils/firebaseUtil'
import moment from 'moment'
import 'moment/locale/vi'  // without this line it didn't work

function App() {
   
    useEffect(() => {
        // fireSet('hehe', true)
        moment.locale('vi')
    }, [])

    return <Router />
}

export default App

// zustand, axios, monaco editor, chart js.
