import { Button, Dropdown, Input, Menu, notification, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Box from '../../../../components/Box'
import { DownOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import { CHALLENGE_LEVEL, CHALLENGE_LEVEL_COLOR, TChallengeLevel } from '../../../Challenge/constants/constants'
import { classNames } from '../../../../helper/helper'

interface IExerciseListProps {}

const ExerciseList: React.FC<IExerciseListProps> = props => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getChallenge = async () => {
            try {
                const res = await ChallengeApi.getAll()
                setData(res.data?.challenge)
            } catch (error) {
                notification.error({ message: 'Có lỗi xảy ra!' })
            }
        }

        getChallenge()
    }, [])

    const columns = [
        {
            title: <p className="font-semibold">Tiêu đề</p>,
            dataIndex: 'title',
            render: (title: string, record: any) => {
                const id = record?._id
                return (
                    <Link
                        to={`/challenge/${id}`}
                        className="font-semibold text-blue-600"
                    >
                        {title}
                    </Link>
                )
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
            dataIndex: 'address',
        },
        {
            title: <p className="font-semibold">Bài đạt</p>,
            dataIndex: 'address',
        },
    ]

    const menu = (
        <Menu
            items={[
                {
                    label: <p>Tất cả</p>,
                    key: '0',
                },
                {
                    label: <p>Dễ</p>,
                    key: '1',
                },
                {
                    label: <p>Trung bình</p>,
                    key: '2',
                },
                {
                    label: <p>Khó</p>,
                    key: '3',
                },
            ]}
        />
    )

    return (
        <Box className="rounded-md p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-medium text-lg">Danh sách bài tập</h3>
                <div className="flex items-center gap-4">
                    <Dropdown overlay={menu}>
                        <div className="flex cursor-pointer items-center whitespace-nowrap">
                            <span> Tất cả</span> <DownOutlined className="ml-2" />
                        </div>
                    </Dropdown>
                    <Input
                        placeholder="Từ khóa"
                        suffix={<SearchOutlined />}
                        className="rounded-sm"
                    />
                    <Button
                        icon={<RedoOutlined />}
                        type="primary"
                        className="flex items-center bg-primary "
                    >
                        Làm mới
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
