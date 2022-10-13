import { CalendarOutlined, ClockCircleOutlined, DownOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, Input, List, Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import Box from '../../components/Box'

interface IExamProps {}

const Exam: React.FC<IExamProps> = props => {
    const menu = (
        <Menu
            items={[
                {
                    label: <p>Tất cả</p>,
                    key: '0',
                },
                {
                    label: <p>Đang diễn ra</p>,
                    key: '1',
                },
                {
                    label: <p>Chưa bắt đầu</p>,
                    key: '2',
                },
                {
                    label: <p>Đã kết thúc</p>,
                    key: '3',
                },
            ]}
        />
    )

    const data = [
        {
            title: 'PRACTICE CONTEST 1 (SỐ HỌC)',
            startDate: '2022-7-7 22:28',
            time: '3 days',
            status: 'finished',
        },
        {
            title: 'PRACTICE CONTEST 1 (SỐ HỌC)',
            startDate: '2022-7-7 22:28',
            time: '3 days',
            status: 'finished',
        },
    ]

    return (
        <div className="p-8 pt-2  lg:p-24 lg:pt-2">
            <Box className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-medium text-lg">Tất cả kỳ thi</h3>
                    <div className="flex items-center gap-4">
                        <Dropdown overlay={menu}>
                            <div className="flex cursor-pointer items-center whitespace-nowrap">
                                <span> Trạng thái</span> <DownOutlined className="ml-2" />
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
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item className="item-center flex justify-between p-5">
                            <div>
                                <Link
                                    to="#"
                                    className="text-lg underline-offset-4 hover:underline"
                                >
                                    {item.title}
                                </Link>
                                <div className="flex gap-3 mt-2">
                                    <span className="flex items-center gap-1">
                                        <CalendarOutlined className="text-primary" />
                                        {item.startDate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ClockCircleOutlined className="text-primary" />
                                        {item.time}
                                    </span>
                                </div>
                            </div>
                            <Badge color="red" text={item.status} />
                 
                        </List.Item>
                    )}
                />
            </Box>
        </div>
    )
}

export default Exam
