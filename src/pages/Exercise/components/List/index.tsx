import { CheckOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Form, Input, Menu, notification, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import Box from '../../../../components/Box'
import { classNames } from '../../../../helper/helper'
import { useAuthStore } from '../../../../store/useAuthStore'
import useParams from '../../../../utils/useParams'
import { CHALLENGE_LEVEL, CHALLENGE_LEVEL_COLOR, TChallengeLevel } from '../../../Challenge/constants/constants'
import { get, map } from 'lodash'

interface IExerciseListProps {}

const ExerciseList: React.FC<IExerciseListProps> = props => {
    const [form] = Form.useForm()
    const { user } = useAuthStore()
    const { params, addParams } = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        const getChallenge = async () => {
            try {
                const res = await ChallengeApi.userGetAllChallenge(params)
                setData(res.data?.challenge)
            } catch (error) {
                notification.error({ message: 'Có lỗi xảy ra!' })
            }
        }

        getChallenge()
    }, [params])

    const columns = [
        {
            title: '',
            dataIndex: 'countDoChallenge',
            key: 'countDoChallenge',
            render: (text: string, record: any) => {
                const doChallengeIds = map(get(record, 'countDoChallenge'), 'user')
                return <>{doChallengeIds.includes(user.id) && <CheckOutlined className="text-green-500" />}</>
            },
        },
        {
            title: <p className="font-semibold">Mã</p>,
            dataIndex: 'code',
            key: 'code',
            render: (code: string, record: any) => {
                const id = record?._id
                const isRealtime = record?.isRealtime

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
            title: <p className="font-semibold">Tiêu đề</p>,
            dataIndex: 'title',
            render: (title: string) => {
                return <span className="font-medium">{title}</span>
            },
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
            title: <p className="font-semibold">Đã nộp</p>,
            dataIndex: 'countDoChallenge',
            key: 'resolved',
            render: (text: any) => {
                return <span>{text?.length ? text.length : 0}</span>
            },
        },
        {
            title: <p className="font-semibold">Bài đạt</p>,
            dataIndex: 'countDoChallenge',
            key: 'submit',
            render: (text: any) => {
                const countResolve = text?.filter((item: any) => item.isResolved)

                return <span>{countResolve?.length ? countResolve.length : 0}</span>
            },
        },
        // {
        //     title: <p className="font-semibold">Loại</p>,
        //     dataIndex: 'isRealtime',
        //     key: 'isRealtime',
        //     render: (text: any) => {
        //         return (
        //             <>
        //                 <Badge
        //                     status={!text ? 'default' : 'processing'}
        //                     text={!text ? 'Thường' : 'Kiểm tra'}
        //                 />
        //             </>
        //         )
        //     },
        // },
    ]

    const resetFilter = () => {
        addParams({})
        form.resetFields()
    }

    return (
        <Box className="rounded-md p-6">
            <div className="mb-4 flex items-center justify-between border-b border-b-gray-200 pb-3">
                <h3 className="text-medium text-lg">Danh sách bài tập</h3>
                <div className="flex items-center gap-4">
                    <Form
                        form={form}
                        layout="inline"
                    >
                        <Form.Item
                            name="level"
                            className="mr-2"
                        >
                            <Select
                                placeholder="Chọn độ khó"
                                allowClear
                                options={[
                                    {
                                        value: 'EASY',
                                        label: 'Dễ',
                                    },
                                    {
                                        value: 'MEDIUM',
                                        label: 'Thường',
                                    },
                                    {
                                        value: 'HARD',
                                        label: 'Khó',
                                    },
                                    {
                                        value: 'EXPERT',
                                        label: 'Chuyên gia',
                                    },
                                ]}
                                onChange={value => addParams({ level: value })}
                                value={params?.level ? params?.level : undefined}
                            />
                        </Form.Item>
                        <Form.Item name="title">
                            <Input
                                placeholder="Từ khóa"
                                suffix={<SearchOutlined />}
                                className="rounded-sm"
                                onBlur={e => addParams({ title: e.target.value })}
                            />
                        </Form.Item>
                    </Form>

                    <Button
                        icon={<RedoOutlined className="mt-1" />}
                        type="primary"
                        onClick={resetFilter}
                        className="flex items-center bg-primary "
                    >
                        Reset
                    </Button>
                </div>
            </div>

            <Table
                rowKey={record => record._id}
                columns={columns}
                dataSource={data}
            />
        </Box>
    )
}

export default ExerciseList
