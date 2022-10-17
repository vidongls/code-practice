import { Button } from 'antd'
import React from 'react'
import Classify from '../Home/components/Classify'
import ExerciseList from './components/List'

interface IExerciseProps {}

const Exercise: React.FC<IExerciseProps> = props => {
    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <div className="gap-4 lg:grid lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <ExerciseList />
                </div>
                <div className="mt-3 lg:mt-0">
                    <Classify>
                        <Button className='w-full mb-2'>Thử thách 1 bài ngẫu nhiên</Button>
                    </Classify>
                </div>
            </div>
        </div>
    )
}

export default Exercise
