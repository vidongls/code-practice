import { Button } from 'antd'
import React, { useState } from 'react'
import Box from '../../../../components/Box'
import { ClockCircleOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { Table } from 'antd'

interface DataType {
    userName: string

    challengeResolve: number
}

interface EditableRowProps {
    index: number
    children: any
}

interface IRankingProps {}

const Ranking: React.FC<IRankingProps> = props => {
    const [data, setData] = useState([
        {
            userName: 'hihi',
            challengeResolve: 12,
        },
        {
            userName: 'hihiaaa',
            challengeResolve: 12,
        },
    ])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Xếp hạng',
            dataIndex: '',
            key: '',
            render: (text, record, index) => <a>{index}</a>,
        },
        {
            title: 'Tài khoản',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Bài hoàn thành',
            dataIndex: 'challengeResolve',
            key: 'challengeResolve',
        },
    ]

    // const EditableRow: React.FC<EditableRowProps> = props => {
    //     console.log('🧙 ~ record', props)
    //     return (
    //         <>
    //         <tr>
    //             {props.children &&
    //                 props.children.map((item: any, index: number) => (
    //                     <>
    //                         {/* <td className='w-fit'> */}
    //                            {item.record}
    //                             {/* <td><div>sadasaaaaaaaaaasadasddddddddddsaaaaaaaaaa</div></td>  */}
    //                         {/* </td> */}
    //
    //                     </>
    //                 ))}
    //
    //         </tr>
    //          <tr> <div>sadasaaaaaaaaaasadasddddddddddsaaaaaaaaaasadasaaaaaaaaaasadasddddddddddsaaaaaaaaaa</div></tr>
    //         </>
    //
    //     )
    // }
    //
    // const components = {
    //     body: {
    //         row: EditableRow,
    //     },
    // }

    return (
        <Box className="mt-4 flex flex-col justify-between p-4 text-center lg:mt-0">
            {data && (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={record => record?.userName}
                    pagination={false}
                    className="table-ranking bg-transparent"
                    locale={{ emptyText: <></> }}
                    // components={components}
                />
            )}
        </Box>
    )
}

export default Ranking
