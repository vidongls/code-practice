import { Button, Divider } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import Classify from '../Home/components/Classify'
import ExerciseList from './components/List'

interface IExerciseProps {}

const Exercise: React.FC<IExerciseProps> = props => {
    const navigate = useNavigate()

    const getRandomChallenge = () => {
        ChallengeApi.getRandomChallenge()
            .then(res => {
                const { data } = res.data
                navigate(`/challenge/${data?.id}`)
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <div className="gap-4 lg:grid lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <ExerciseList />
                </div>

                <div className="mt-3 lg:mt-0">
                    <Classify>
                        <Button
                            className="mb-2 w-full"
                            onClick={getRandomChallenge}
                        >
                            Thử thách 1 bài ngẫu nhiên
                        </Button>
                    </Classify>
                </div>
            </div>
        </div>
    )
}

export default Exercise
