import { CheckOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Modal, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import { useParams as useParamsReactRouter } from 'react-router-dom'

import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import { differentDate, formatDate } from '../../../../helper/helper'
import useParams from '../../../../utils/useParams'

const ChallengeStatics = () => {
    const { params, addParams } = useParams()
    const { id } = useParamsReactRouter()

    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [contentAnswer, setContentAnswer] = useState({} as any)

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

    const columns = [
        {
            title: 'Sinh viên',
            dataIndex: ['user', 'userName'],
            key: 'userName',
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
            title: 'Thời gian bắt đầu làm bài',
            key: 'startTime',
            dataIndex: 'startTime',
            render: (text: string) => <span>{formatDate(text)}</span>,
        },
        {
            title: 'Thời gian hoàn thành',
            key: 'startedAt',
            dataIndex: ['challenge'],
            render: (startedAt: string, record: any) => {
                const startTime = record?.startTime
                const endTime = record?.endTime

                return <span>{differentDate(endTime, startTime, 'minutes')} phút</span>
            },
        },
        {
            title: 'Thời gian nộp bài',
            key: 'endTime',
            dataIndex: 'endTime',
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

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleViewAnswer = (data: any) => {
        showModal()
        setContentAnswer(data)
    }
    console.log('contentAnswer', contentAnswer)
    return (
        <div className="h-full w-full py-8 px-7">
            <div className="rounded-md bg-white p-6 ">
                <div className="my-6 mt-0 flex items-center">
                    <h3 className="text-base font-semibold">
                        Thống kê challenge -{' '}
                        {data.length ? `${data[0]?.challenge?.code} - ${data[0]?.challenge?.title}` : null}
                    </h3>

                    {/* <span className="text-gray-900y ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold ">
                        {data.length}
                    </span> */}
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
            {isModalOpen && (
                <Modal
                    title={contentAnswer?.challenge?.title}
                    open={true}
                    onCancel={handleCancel}
                    okButtonProps={{ className: 'hidden' }}
                    width={1200}
                >
                    <div className="grid max-h-[650px] grid-cols-2 overflow-y-auto bg-white">
                        <div className="col-span-1 overflow-y-auto">
                            {/* <div dangerouslySetInnerHTML={{ __html: contentAnswer?.challenge?.describe }}></div> */}

                            <div className="mt-4 mr-2 border border-gray-200 bg-white p-4">
                                {contentAnswer?.compileResult?.map((item: any, idx: number) => {
                                    return (
                                        <div
                                            className="mb-6 gap-3 border-b pb-5"
                                            key={idx}
                                        >
                                            <div className="mb-3">
                                                <div className=" bg-green-200 p-1 text-base font-medium">
                                                    Testcase {idx}
                                                    <span className="ml-2">
                                                        {item?.status ? (
                                                            <CheckOutlined className="anticon-custom text-green-500" />
                                                        ) : (
                                                            <CloseCircleOutlined className="anticon-custom text-red-500" />
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span>Input </span>
                                                <pre className="mt-2 mb-4 w-full bg-gray-100 p-2">
                                                    {item.testCaseInput}
                                                </pre>

                                                <span>Your Output</span>
                                                <pre className="mt-2 mb-4 w-full bg-gray-100 p-2 ">{item.data}</pre>

                                                <span>Expected Output</span>
                                                <pre className="mt-2 w-full bg-gray-100 p-2">{item.expectedOutput}</pre>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="col-span-1 border-l">
                            <div className="w-full p-2">
                                <div>
                                    <CopyBlock
                                        language={'javascript'}
                                        text={contentAnswer?.answerContent}
                                        showLineNumbers={true}
                                        theme={dracula}
                                        wrapLines={true}
                                        codeBlock
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ChallengeStatics
