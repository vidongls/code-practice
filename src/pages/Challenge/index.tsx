import { notification, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import CodeEditor from '../../components/CodeEditor'

import Tabs from '../../components/Tabs'

import Description from './components/Description'
import Header from './components/Header'
export interface IDetail {
    title: string
    describe: string
    testCase: {
        input: string
        output: string
    }[]
    content: string
    functionName: string
}

interface IChallengeProps {}

const Challenge: React.FC<IChallengeProps> = props => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState<IDetail>({} as IDetail)

    useEffect(() => {
        const getDetailChallenge = async () => {
            setLoading(true)
            console.log('as')
            try {
                const res = await ChallengeApi.getOne(id!)
                setDetail(res.data)
            } catch (error) {
                notification.error({ message: 'Có lỗi xảy ra!' })
            } finally {
                setLoading(false)
            }
        }
        getDetailChallenge()
    }, [id])

    const items = [
        {
            label: 'Thông tin',
            key: 'info',
            content: (
                <Description
                    loading={loading}
                    detail={detail}
                />
            ),
        },
        { label: 'Thảo luận', key: 'discussion', content: 'dis' },
        { label: 'Bảng xếp hạng', key: 'ranking', content: 'bxh' },
    ]
    return (
        <div className="bg-white">
            <Header />
            {/* h-[calc(100vh_-_50px)] */}
            <div className="grid  grid-cols-2 bg-white ">
                <div className="overflow-y-auto shadow-xl shadow-gray-200">
                    <Tabs items={items} />
                </div>

                <Spin spinning={loading}>
                    <CodeEditor detail={detail} />
                </Spin>
            </div>
        </div>
    )
}

export default Challenge
