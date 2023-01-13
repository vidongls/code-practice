import React from 'react'

import NewExercise from './components/NewExercise'
import Ranking from './components/Ranking'
import Statistic from './components/Statistic'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
    return (
        <div className="px-7 py-4">
            <div className="gap-4 lg:grid lg:grid-cols-4">
                <div className="col-span-3">
                    {/* <Notification /> */}
                    <NewExercise />
                </div>

                <div className="col-span-1">
                    <Ranking />
                    <Statistic />
                </div>
            </div>
            {/* <CountDown startTime={new Date().getTime()} duration={60000} /> */}
        </div>
    )
}

export default Home
