import { Button, Dropdown, Input, Menu, Table } from 'antd'
import React from 'react'
import Box from '../../../../components/Box'
import { DownOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

interface DataType {
    key: React.Key
    title: string
    age: number
    address: string
}

interface IExerciseListProps {}

const ExerciseList: React.FC<IExerciseListProps> = props => {
    const columns: ColumnsType<DataType> = [
        {
            title: <p className="font-semibold">Tiêu đề</p>,
            dataIndex: 'title',
            render(title, record, index) {
                return <Link to="/challenge">{title}</Link>
            },
        },
        {
            title: <p className="font-semibold">Mức độ</p>,
            dataIndex: 'address',
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

    const data: DataType[] = [
        {
            key: '1',
            title: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            title: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            title: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            title: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ]

    return (
        <Box className="p-6">
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
                columns={columns}
                dataSource={data}
            />
        </Box>
    )
}

export default ExerciseList
