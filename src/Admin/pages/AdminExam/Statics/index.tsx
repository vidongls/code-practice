import { CheckOutlined, CloseCircleOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Modal, Table, Tabs, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import { Link, useParams as useParamsReactRouter } from 'react-router-dom'

import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import { classNames, differentDate, formatDate } from '../../../../helper/helper'
import useParams from '../../../../utils/useParams'
import { get } from 'lodash'

const AdminExamStatistic = () => {
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
            title: 'Họ và tên',
            dataIndex: ['user'],
            key: 'user',
            render: (text: any) => {
                return <span> {`${get(text, 'firstName', '-')} ${get(text, 'lastName', '-')}`}</span>
            },
        },
        {
            title: 'Mã sinh viên',
            dataIndex: ['user', 'code'],
            key: 'code',
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
            title: 'Thời gian làm bài',
            key: 'startedAt',
            dataIndex: ['challenge', 'startedAt'],
            render: (startedAt: string, record: any) => {
                const endTime = record?.endTime

                return <span>{differentDate(endTime, startedAt, 'minutes')} phút</span>
            },
        },
        {
            title: 'Thời gian nộp bài',
            key: 'endTime',
            dataIndex: 'endTime',
            render: (text: string) => <span>{formatDate(text)}</span>,
        },
        {
            title: 'Số test case hoàn thành',
            key: 'endTime',
            dataIndex: 'endTime',
            render: (text: string, record: any) => {
                const listResolve = record?.compileResult?.filter((item: any) => item?.status)
                return (
                    <span
                        className={classNames('font-medium', {
                            'text-red-500': listResolve?.length !== record?.challenge?.testCase?.length,
                            'text-green-500': listResolve?.length === record?.challenge?.testCase?.length,
                        })}
                    >{`${listResolve?.length || 0}/${record?.challenge?.testCase?.length || 0}`}</span>
                )
            },
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
    return (
        <div className="h-full w-full py-8 px-7">
            <Link
                to={'/admin/exam'}
                className="mb-5 flex w-fit items-center"
            >
                <ArrowLeftOutlined className="mr-2" />
                Trở về Danh Sách bài thi
            </Link>
            <div className="rounded-md bg-white p-6 ">
                <div className="my-6 mt-0 flex items-center">
                    <h3 className="text-base font-semibold">
                        Thống kê bài thi
                        {params?.title ? ` - ${params?.title}` : null}
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

                            <div className=" mr-2 border border-gray-200 bg-white p-4">
                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition={'left'}
                                    type="card"
                                    className="mt-2 border"
                                    items={contentAnswer?.compileResult?.map((item: any, index: any) => {
                                        return {
                                            label: (
                                                <>
                                                    <div
                                                        className={'flex justify-between p-1 text-base font-medium'}
                                                        key={index}
                                                    >
                                                        <span
                                                            className={classNames(' ', {
                                                                'text-green-500': item?.status,
                                                                'text-red-500': !item?.status,
                                                            })}
                                                        >
                                                            Testcase {index + 1}
                                                        </span>
                                                        <span className="ml-2">
                                                            <CloseCircleOutlined
                                                                className={classNames('anticon-custom', {
                                                                    'text-green-500': item?.status,
                                                                    'text-red-500': !item?.status,
                                                                })}
                                                            />
                                                        </span>
                                                    </div>
                                                </>
                                            ),
                                            key: index,
                                            children: (
                                                <div className="mb-4 py-8 pr-4">
                                                    <span>Compiler Message</span>
                                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-3 ">
                                                        {item?.data}
                                                    </pre>

                                                    <span>Input </span>
                                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                        {item?.testCaseInput}
                                                    </pre>

                                                    <span>Your Output</span>
                                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                        {item?.data}
                                                    </pre>

                                                    <span>Expected Output</span>
                                                    <pre className="mt-2 w-full bg-gray-100 p-2 font-semibold">
                                                        {item?.expectedOutput}
                                                    </pre>
                                                </div>
                                            ),
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 border-l">
                            <div className="w-full p-2">
                                <div>
                                    <CopyBlock
                                        language={'javascript'}
                                        text={contentAnswer?.answerContent ?? ''}
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

export default AdminExamStatistic
