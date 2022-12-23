import React from 'react'
import CountDown from '../../components/CountDown/CountDown'

import NewExercise from './components/NewExercise'
import Notification from './components/Notification'
import Ranking from './components/Ranking'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
    return (
        <div className="p-10">
            <div className="gap-4 lg:grid lg:grid-cols-4">
                
                <div className="lg:col-span-3">
                    <Notification />
                    <div className="mt-4">
                        <NewExercise />
                    </div>
                </div>
                <Ranking />
            </div>
            {/* <CountDown startTime={new Date().getTime()} duration={60000} /> */}
        </div>
    )
}

export default Home
