import { ClockCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import Box from '../../components/Box'
import { useAuthStore } from '../../store/useAuthStore'
import Classify from './components/Classify'
import NewExercise from './components/NewExercise'
import Notification from './components/Notification'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
    return (
        <div className="p-24 pt-10">
            <div className="gap-4 lg:grid lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <Notification />
                    <div className="mt-4">
                        <NewExercise />
                        {/* <Classify /> */}
                    </div>
                </div>
                {/* <div className="box text-center flex flex-col justify-between"> */}
                <div>
                    <Box className="mt-4 flex flex-col justify-between p-10 text-center lg:mt-0">
                        <span className="mt-6 block">Rủ bạn bè vào cày rank thôi nào!</span>
                        <div className="mt-5 text-3xl font-semibold">
                            Thứ 5 <br /> 22/09/2022
                        </div>
                        <div className="my-4 text-start">
                            Trí tuệ của con người trưởng thành trong tĩnh lặng, còn tính cách trưởng thành trong bão
                            táp.
                        </div>
                        <Button
                            type="primary"
                            className="rounded bg-primary font-medium"
                        >
                            <ClockCircleOutlined className="anticon-custom" /> Ghi Danh
                        </Button>
                    </Box>
                </div>

                {/* <button className="btn  w-full"></button> */}
                {/* </div> */}

                {/* <CodeEditor /> */}
            </div>
        </div>
    )
}

export default Home
