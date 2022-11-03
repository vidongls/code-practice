import { Badge, Table } from 'antd'
import React from 'react'
import { AlignType } from 'rc-table/lib/interface'
interface IListProps {
    data: any
}

const List: React.FC<IListProps> = ({ data }) => {
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Độ khó',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            // align: 'right' as AlignType,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
            title: 'Action',
            key: 'action',
        },
    ]

    return (
        <div className="rounded-md bg-white p-6 ">
            <div className="my-6 mt-0 flex items-center">
                <h3 className="text-base font-semibold">Danh sách challenge</h3>

                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-white ">
                    2
                </span>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: true,
                }}
            />
        </div>
    )
}

export default List
