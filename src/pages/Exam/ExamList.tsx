import { SearchOutlined, CheckOutlined } from '@ant-design/icons'
import { Badge, Form, Input, Table, notification } from 'antd'
import React, { useEffect, useState } from 'react'

import Box from '../../components/Box'
import useParams from '../../utils/useParams'
import { filter, get, map } from 'lodash'
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { useParams as useParamRouter } from 'react-router-dom'
import ClassApi from '../../Api/Class/ClassApi'

const ExamList = () => {
    const { params, addParams } = useParams()
    const { classId } = useParamRouter()
    const [form] = Form.useForm()
    const { user } = useAuthStore()

    const [data, setData] = useState([])
    const [classes, setClasses] = useState({} as any)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getChallenge = async () => {
            setLoading(true)
            try {
                const res = await ChallengeApi.getAllChallengeByClass(classId, params)
                setData(res.data?.challenge)
            } catch (error) {
                notification.error({ message: 'Có lỗi xảy ra!' })
            } finally {
                setLoading(false)
            }
        }

        getChallenge()
    }, [params, classId])

    useEffect(() => {
        const getClassById = () => {
            ClassApi.getOne(classId as string).then(res => {
                setClasses(get(res, 'data.data'))
            })
        }
        getClassById()
    }, [classId])

    const columns = [
        {
            title: '',
            dataIndex: 'countDoChallenge',
            key: 'countDoChallenge',
            render: (text: string, record: any) => {
                const doChallengeIds = map(get(record, 'countDoChallenge'), 'user')
                const isResolved = get(filter(get(record, 'countDoChallenge'), ['user', user?.id]), '0.isResolved')

                return (
                    <>
                        {doChallengeIds.includes(user?.id) && (
                            <span className="flex items-center">
                                {isResolved && <CheckOutlined className="text-green-500" />}
                                <CheckOutlined className="text-green-500" />
                            </span>
                        )}
                    </>
                )
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
                        to={`${id}`}
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
        {
            title: <p className="font-semibold">Trạng thái</p>,
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => {
                return text && renderStatus(text)
            },
        },
    ]

    const renderStatus = (status: string) => {
        switch (status) {
            case 'NEW':
                return (
                    <Badge
                        status={'default'}
                        text={'Chưa bắt đầu'}
                    />
                )
            case 'PROCESSING':
                return (
                    <Badge
                        status={'processing'}
                        text={'Đang diễn ra'}
                    />
                )
            case 'SUCCESS':
                return (
                    <Badge
                        status={'warning'}
                        text={'Đã kết thúc'}
                    />
                )
            default:
                break
        }
    }

    const resetFilter = () => {
        addParams({})
        form.resetFields()
    }
    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <Box className="p-6">
                <div className="mb-4 flex items-center justify-between border-b border-b-gray-200 pb-3">
                    <h3 className="text-medium text-lg">{`Bài thi ${classes?.name ? '- ' + classes?.name : ''}`}</h3>
                    <Form
                        form={form}
                        layout="inline"
                    >
                        <Form.Item name="title">
                            <Input
                                placeholder="Từ khóa"
                                suffix={<SearchOutlined />}
                                className="rounded-sm"
                                onBlur={e => addParams({ title: e.target.value })}
                            />
                        </Form.Item>
                    </Form>
                </div>
                <Table
                    rowKey={record => record._id}
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                />
            </Box>
        </div>
    )
}

export default ExamList
