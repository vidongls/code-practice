import { Button, notification, Result, Spin, Modal } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IRealtimeData } from '../../Admin/pages/Challange/List'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'

import Tabs from '../../components/Tabs'
import { fireGet, fireGetOne, fireGetUnsubscribe } from '../../utils/firebaseUtil'

import ChallengeLobby from '../Challenge/components/Lobby'
import { IComment } from '../Challenge/components/Comment'
import ExamCodeEditor from './ExamEditor'
import { off } from 'firebase/database'
import Description from './components/Description'
import { get, isEmpty } from 'lodash'
import ModalShowResolved from './ModalShowResolved'

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

interface IExamDoingProps {}

const ExamDoing: React.FC<IExamDoingProps> = props => {
    const { classId, challengeId: id } = useParams()
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState<IDetail>({} as IDetail)
    const [isStarted, setIsStarted] = useState(false)
    const [isEnded, setIsEnded] = useState(false)
    const [errors, setErrors] = useState({} as any)
    const [dataRealtime, setDataRealtime] = useState({} as IRealtimeData)
    const [dataDoingResolved, setDataDoingResolved] = useState({} as any)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const getDetailExamDoing = useCallback(async () => {
        setLoading(true)
        try {
            const res = await ChallengeApi.userGetDetail(id!)
            const end = get(res, 'data.status', '') === 'SUCCESS'

            setIsEnded(end)
            setDetail(res.data)
        } catch (error: any) {
            const { response } = error
            setErrors(response)
            // notification.error({ message: 'Có lỗi xảy ra!' })
        } finally {
            setLoading(false)
        }
    }, [id])

    const items = [
        {
            label: 'Thông tin',
            key: 'info',
            content: (
                <Description
                    loading={false}
                    detail={detail}
                    isEnded={isEnded}
                    dataRealtime={dataRealtime}
                    dataDoingResolved={dataDoingResolved}
                />
            ),
        },

        // { label: 'Bảng xếp hạng', key: 'ranking', content: 'bxh' },
    ]
    useEffect(() => {
        getDetailExamDoing()
    }, [getDetailExamDoing])

    useEffect(() => {
        const checkSubmittedChallenge = () => {
            if (id) {
                try {
                    setLoading(true)
                    ChallengeApi.getOneDoingChallenge(id)
                        .then(res => {
                            const { data } = res
                            if (data?.isSubmit) {
                                setDataDoingResolved(data)
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

        fireGetOne(`/classes/${classId}/challenge-${id}`).then((data: any) => {
            if (data) {
                // const duration = detail.time
                // const isEnded = data.startTime + duration < Date.now()
                // if (!isEnded) {
                //     // startDoingChallenge()
                // } else {
                //     setIsEnded(isEnded)
                // }

                setDataRealtime(data)
            }
        })

        // const startDoingChallenge = async () => {
        //     if (id) {
        //         try {
        //             await ChallengeApi.startDoingChallenge(id)
        //         } catch (error) {}
        //     }
        // }
    }, [detail, id, classId])

    useEffect(() => {
        fireGetUnsubscribe(`/classes/${classId}/challenge-${id}`, (data: any, unsubscribe: any) => {
            if (data?.started) {
                getDetailExamDoing()
                setIsStarted(true)
                unsubscribe()
            } else {
                setIsStarted(false)
            }
        })
    }, [id, getDetailExamDoing, classId])



    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onComplete = () => {
        showModal()
    }
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
        <>
            <div className="bg-white">
                {/* <Header /> */}
                {/* h-[calc(100vh_-_50px)] */}

                {!detail.isRealtime || isStarted ? (
                    <div className="grid grid-cols-5 bg-white ">
                        <div className="col-span-2 overflow-y-auto shadow-xl shadow-gray-200">
                            <Tabs items={items} />
                        </div>

                        <div className="col-span-3">
                            <ExamCodeEditor
                                detail={detail}
                                isEnded={isEnded}
                            />
                        </div>
                    </div>
                ) : (
                    <ChallengeLobby />
                )}
            </div>
            {(isEnded || isModalOpen) && isEmpty(dataDoingResolved) && (
                <Modal
                    title={false}
                    open={true}
                    onOk={handleOk}
                    footer={false}
                    closable={false}
                >
                    <p className="text-center text-2xl font-medium">Bài thi đã kết thúc!</p>
                    <div className="mt-8 flex justify-end">
                        <Link to={'/'}>
                            <Button>Về trang chủ</Button>
                        </Link>
                    </div>
                </Modal>
            )}

            {!isEmpty(dataDoingResolved) && (
                <ModalShowResolved
                    data={dataDoingResolved}
                    challengeTestCase={detail?.testCase}
                />
            )}
        </>
    )
}

export default ExamDoing
