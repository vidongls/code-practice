import { Modal, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import useParams from '../../../../utils/useParams'
import { Link, useParams as useParamsReactRouter } from 'react-router-dom'
import { differentDate, formatDate } from '../../../../helper/helper'
import { InfoCircleOutlined } from '@ant-design/icons'

const ChallengeStatics = () => {
    const { params, addParams } = useParams()
    const { id } = useParamsReactRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [contentAnswer, setContentAnswer] = useState()

    const columns = [
        {
            title: 'Mã challenge',
            dataIndex: 'challenge',
            key: 'code',
            render: (text: any, record: any) => {
                const id = text?._id
                const code = text?.code

                return (
                    <Link
                        to={`/challenge/${id}`}
                        className="font-semibold text-blue-600"
                    >
                        {code}
                    </Link>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: ['challenge', 'title'],
            key: 'title',
        },
        // {
        //     title: 'Nội dung bài làm',
        //     dataIndex:'answerContent',
        //     key: 'answerContent',
        //     render:(text: string)=>{
        //         return <pre></pre>
        //     }
        // },
        {
            title: 'Thời gian hoàn thành',
            key: 'startedAt',
            dataIndex: ['challenge', 'startedAt'],
            render: (startedAt: string, record: any) => {
                const createdAt = record?.createdAt

                return <span>{differentDate(createdAt, startedAt, 'minutes')} phút</span>
            },
        },
        {
            title: 'Thời gian nộp bài',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (text: string) => <span>{formatDate(text)}</span>,
        },
        {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (text: string, record: any) => {

            

                return (
                    <div className="flex items-center">
                        <Tooltip title="Xem nội dung bài làm">
                            <InfoCircleOutlined
                                className="cursor-pointer p-3 hover:text-blue-500"
                                onClick={() => handleViewAnswer(record)}
                            />
                        </Tooltip>
                    </div>
                )
            },
        },
    ]

    useEffect(() => {
        const getStaticsRealtime = () => {
            setLoading(true)
            ChallengeApi.getStaticsChallengeRealtime(id as string, params)
                .then(res => {
                    setData(res.data?.data)
                })
                .catch(error => {})
                .finally(() => setLoading(false))
        }
        getStaticsRealtime()
    }, [id, params])

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleViewAnswer = (data: any) => {
        console.log("🧙 ~ data", data)

    }

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="rounded-md bg-white p-6 ">
                <div className="my-6 mt-0 flex items-center">
                    <h3 className="text-base font-semibold">Thống kê challenge</h3>

                    <span className="text-gray-900y ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold ">
                        {data.length}
                    </span>
                </div>
                <Table
                    columns={columns}
                    rowKey={(record: any) => record?._id}
                    loading={loading}
                    dataSource={data}
                    scroll={{
                        x: 768,
                    }}
                />
            </div>
            {
                <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            }
        </div>
    )
}

export default ChallengeStatics
