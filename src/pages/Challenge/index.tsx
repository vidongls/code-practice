import { notification, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import CodeEditor from '../../components/CodeEditor'

import Tabs from '../../components/Tabs'
import { fireGet } from '../../utils/firebaseUtil'
import Comment, { IComment } from './components/Comment'

import Description from './components/Description'
import Header from './components/Header'
import ChallengeLobby from './components/Lobby'
export interface IDetail {
    _id: string
    title: string
    describe: string
    testCase: {
        input: string
        output: string
    }[]
    content: string
    functionName: string
    comments: IComment[]
    isRealtime: boolean
    time: number
}

interface IChallengeProps {}

const Challenge: React.FC<IChallengeProps> = props => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState<IDetail>({} as IDetail)
    const [isStarted, setIsStarted] = useState(false)

    const getDetailChallenge = useCallback(async () => {
        setLoading(true)
        try {
            const res = await ChallengeApi.getOne(id!)
            setDetail(res.data)
        } catch (error) {
            notification.error({ message: 'Có lỗi xảy ra!' })
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        getDetailChallenge()
    }, [getDetailChallenge])

    useEffect(() => {
        fireGet(`challenge-${id}`, (data: any) => {
            if (data.started) {
                getDetailChallenge()
                setIsStarted(true)
            } else {
                setIsStarted(false)
            }
        })
    }, [id, getDetailChallenge])

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
        {
            label: 'Thảo luận',
            key: 'discussion',
            content: (
                <Comment
                    challengeId={detail._id}
                    comments={detail.comments}
                    refetch={getDetailChallenge}
                />
            ),
        },
        // { label: 'Bảng xếp hạng', key: 'ranking', content: 'bxh' },
    ]
    return (
        <div className="bg-white">
            {/* <Header /> */}
            {/* h-[calc(100vh_-_50px)] */}

            {!detail.isRealtime || isStarted ? (
                <div className="grid grid-cols-5 bg-white ">
                    <div className="col-span-2 overflow-y-auto shadow-xl shadow-gray-200">
                        <Tabs items={items} />
                    </div>

                    <div className="col-span-3">
                        <Spin spinning={loading}>
                            <CodeEditor detail={detail} />
                        </Spin>
                    </div>
                </div>
            ) : (
                <ChallengeLobby />
            )}
        </div>
    )
}

export default Challenge
