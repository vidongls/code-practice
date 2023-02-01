import {
    BarChartOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlayCircleOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import { Modal, notification, Spin, Table, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import ChallengeApi from '../../../Api/Challenge/ChallengeApi'
import { classNames, formatDate, truncateString } from '../../../helper/helper'
import { CHALLENGE_LEVEL, CHALLENGE_LEVEL_COLOR, TChallengeLevel } from '../../../pages/Challenge/constants/constants'
import { fireGet, fireGetOne } from '../../../utils/firebaseUtil'
import ModalUpdateClasses from './components/ModalUpdateClasses'
import { get, isEmpty, map, mapValues } from 'lodash'

export interface IRealtimeData {
    id: string
    startTime: number
    started: boolean
}

interface IListProps {
    data: any
    loading: boolean
    params: object
    getChallenge: () => void
}

const List: React.FC<IListProps> = ({ data, loading, getChallenge }) => {
    const [isVisibleClasses, setIsVisibleClasses] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingStart, setLoadingStart] = useState(false)
    const [dataRealtime, setDataRealtime] = useState<any>()
    const [dataUpdateClasses, setDataUpdateClasses] = useState({})

    useEffect(() => {
        const getDataFire = async () => {
            setLoadingStart(true)
            fireGetOne(`/classes`)
                .then(data => {
                    if (data) {
                        setDataRealtime(data)
                    }
                })
                .catch(res => {})
                .finally(() => setLoadingStart(false))
        }

        getDataFire()
    }, [data])

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            render: (text: string, record: any) => {
                const id = record?._id
                const isExamStarted = record?.isExamStarted
                return (
                    <div>
                        <Link
                            to={`/admin/exam/${id}`}
                            className="font-semibold text-blue-600"
                        >
                            {text}
                        </Link>{' '}
                        {isExamStarted && <CheckOutlined className="anticon-custom ml-3 text-green-500" />}
                    </div>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Mức độ',
            dataIndex: 'level',
            key: 'level',
            render: (text: TChallengeLevel) => {
                return (
                    <span
                        className={classNames('rounded px-2.5 py-0.5 text-xs font-semibold', {
                            [CHALLENGE_LEVEL_COLOR[text]]: true,
                        })}
                    >
                        {CHALLENGE_LEVEL[text]}
                    </span>
                )
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'describe',
            key: 'describe',
            width: '25%',
            ellipsis: true,
            render: (text: string) => {
                return (
                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: truncateString(text, 70) }}
                            className="truncate"
                        ></div>
                        {text.length >= 70 && (
                            <span
                                onClick={() => onViewDescribe(text)}
                                className="ml-2 cursor-pointer whitespace-nowrap text-blue-500 hover:text-blue-400"
                            >
                                Xem thêm
                            </span>
                        )}
                    </div>
                )
                // <div dangerouslySetInnerHTML={{ __html: text }}></div>
            },
            // align: 'right' as AlignType,
        },
        {
            title: 'Ngày tạo',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (text: string) => <span>{formatDate(text)}</span>,
        },
        {
            title: 'Lớp được thi',
            key: 'classes',
            dataIndex: 'classes',
            render: (data: any, record: any) => {
                const isRealtime = record?.isRealtime
                return (
                    isRealtime && (
                        <div className="flex items-center">
                            <EditOutlined
                                className="cursor-pointer p-3 hover:text-blue-500"
                                onClick={() => handleVisibleModal(record)}
                            />
                        </div>
                    )
                )
            },
        },
        {
            title: 'Chức năng',
            key: '_id',
            dataIndex: '_id',
            render: (id: string, record: any) => {
                const title = record?.title
                const isExamStarted = record?.isExamStarted
                let isEnded = false
                if (!isEmpty(record?.classes)) {
                    map(record?.classes, item => {
                        isEnded = Object.values(mapValues(get(dataRealtime, item._id), 'started')).every(item => !item)
                    })
                } else {
                    isEnded = true
                }

                return (
                    <div className="flex items-center">
                        {!isExamStarted && (
                            <>
                                <Tooltip title="Chỉnh sửa">
                                    <Link
                                        to={`/admin/exam/edit/${id}`}
                                        className="leading-3"
                                    >
                                        <EditOutlined className="cursor-pointer p-3 text-blue-600 hover:text-blue-400" />
                                    </Link>
                                </Tooltip>
                                <Tooltip title="Xóa">
                                    <Spin spinning={loadingDelete}>
                                        <DeleteOutlined
                                            className="cursor-pointer p-3 text-red-600 hover:text-red-400"
                                            onClick={() => onDeleteChallenge(id)}
                                        />
                                    </Spin>
                                </Tooltip>
                            </>
                        )}
                        {!isExamStarted && isEnded && (
                            <Tooltip title={`Bắt đầu`}>
                                <Spin spinning={loadingStart}>
                                    <PlayCircleOutlined
                                        className="cursor-pointer p-3 text-yellow-600 hover:text-yellow-400"
                                        onClick={() => onStartChallenge(id)}
                                    />
                                </Spin>
                            </Tooltip>
                        )}
                        <Tooltip title="Thống kê">
                            <Link
                                to={`/admin/exam/statics/${id}?title=${title ? title.replaceAll(' ', '+') : ''}`}
                                className="leading-3"
                            >
                                <BarChartOutlined className="cursor-pointer p-3 text-green-600 hover:text-green-400" />
                            </Link>
                        </Tooltip>
                    </div>
                )
            },
        },
    ]

    const onStartChallenge = (id: string) => {
        Modal.confirm({
            title: 'Bạn thực sự muốn bắt đầu bài thi?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                return ChallengeApi.startRealtimeChallenge(id)
                    .then(result => {
                        getChallenge()
                        notification.success({ message: 'Bắt đầu thành công' })
                    })
                    .catch(err => {
                        notification.error({ message: 'Bắt đầu thất bại' })
                    })
            },
            okButtonProps: { className: 'bg-primary' },
            okText: 'Bắt đầu',
            cancelText: 'Đóng',
            onCancel() {},
        })
    }

    const onViewDescribe = (content: string) => {
        Modal.confirm({
            title: '',
            icon: false,
            width: 800,
            content: <div dangerouslySetInnerHTML={{ __html: content }}></div>,
            closable: true,
            cancelText: 'Đóng',
            okButtonProps: { className: 'hidden' },
        })
    }

    // const onConfirmDelete = (id: string) => {
    //     Modal.confirm({
    //         title: 'Bạn thực sự muốn xóa challenge này?',
    //         icon: <ExclamationCircleOutlined />,
    //         width: 600,
    //         content: '',
    //         closable: true,
    //         cancelText: 'Đóng',
    //         okText: 'Xoá',
    //         okButtonProps: { loading: loadingDelete },
    //         onOk: () => onDeleteChallenge(id),
    //     })
    // }

    const onDeleteChallenge = (id: string) => {
        Modal.confirm({
            title: 'Bạn thực sự muốn xóa bài thi này?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                setLoadingDelete(true)

                return ChallengeApi.remove(id)
                    .then(result => {
                        getChallenge()
                        notification.success({ message: 'Xoá bài thi thành công' })
                    })
                    .catch(err => {
                        notification.error({ message: 'Xoá bài thi thất bại' })
                    })
                    .finally(() => setLoadingDelete(false))
            },
            onCancel() {},
        })
    }

    const handleVisibleModal = (data: any) => {
        setIsVisibleClasses(true)
        setDataUpdateClasses(data)
    }

    const handleHideModal = () => {
        setIsVisibleClasses(false)
    }

    return (
        <>
            <div className="rounded-md bg-white p-6 ">
                <div className="my-6 mt-0 flex items-center">
                    <h3 className="text-base font-semibold">Danh sách bài thi</h3>

                    <span className="text-gray-900y ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold ">
                        {data?.length}
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
            {isVisibleClasses && (
                <ModalUpdateClasses
                    onCancel={handleHideModal}
                    dataClass={dataUpdateClasses}
                    getChallenge={getChallenge}
                />
            )}
        </>
    )
}

export default List
