import { Button, notification, Result, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IRealtimeData } from '../../Admin/pages/Challange/List'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import CodeEditor from '../../components/CodeEditor'

import Tabs from '../../components/Tabs'
import { fireGet, fireGetOne } from '../../utils/firebaseUtil'
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
    startTime: number
}

interface IChallengeProps {}

const Challenge: React.FC<IChallengeProps> = props => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState<IDetail>({} as IDetail)
    const [isStarted, setIsStarted] = useState(false)
    const [isEnded, setIsEnded] = useState(false)
    const [errors, setErrors] = useState({} as any)
    const [dataRealtime, setDataRealtime] = useState({} as IRealtimeData)

    const getDetailChallenge = useCallback(async () => {
        setLoading(true)
        try {
            const res = await ChallengeApi.getOne(id!)
            setDetail(res.data)
        } catch (error: any) {
            const { response } = error
            setErrors(response)
            notification.error({ message: 'Có lỗi xảy ra!' })
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        getDetailChallenge()
    }, [getDetailChallenge])

    useEffect(() => {
        if (detail.isRealtime) {
            const checkSubmittedChallenge = () => {
                if (id) {
                    try {
                        setLoading(true)
                        ChallengeApi.getOneDoingChallenge(id)
                            .then(res => {
                                const { data } = res
                                if (data?.isResolved) {
                                    return true
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                            .finally(() => {
                                setLoading(false)
                            })

                        return false
                    } catch (error) {}
                }
            }

            if (checkSubmittedChallenge()) {
                return
            }

            fireGetOne(`challenge-${id}`).then((data: any) => {
                if (data) {
                    const duration = detail.time
                    const isEnded = data.startTime + duration < Date.now()

                    if (!isEnded) {
                        startDoingChallenge()
                    }

                    setIsEnded(isEnded)
                    setDataRealtime(data)
                }
            })
        }

        const startDoingChallenge = async () => {
            if (id) {
                try {
                    await ChallengeApi.startDoingChallenge(id)
                } catch (error) {}
            }
        }
    }, [detail, id])

    useEffect(() => {
        fireGet(`challenge-${id}`, (data: any) => {
            if (data?.started) {
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
                    isEnded={isEnded}
                    dataRealtime={dataRealtime}
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

    if (errors?.status === 404) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, Trang web bạn truy cập không tồn tại"
                extra={
                    <Link to={'/'}>
                        <Button>Về trang chủ</Button>
                    </Link>
                }
            />
        )
    }

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
                            <CodeEditor
                                detail={detail}
                                isEnded={isEnded}
                            />
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
