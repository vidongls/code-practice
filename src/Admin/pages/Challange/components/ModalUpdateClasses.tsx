import { Button, Modal, Table } from 'antd'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import ClassApi from '../../../../Api/Class/ClassApi'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'

interface IModalUpdateClassesProps {
    onCancel: () => void
    dataClass: any
}

const ModalUpdateClasses: React.FC<IModalUpdateClassesProps> = ({ dataClass, onCancel }) => {
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const getAll = async () => {
            setLoading(true)
            try {
                const res = await ClassApi.getClassByAuthor()
                setData(res.data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        getAll()
    }, [])

    useEffect(() => {
        setSelectedRowKeys(get(dataClass, 'classes'))
    }, [dataClass])

    const columns = [
        {
            title: 'Mã lớp',
            dataIndex: 'code',
        },
        {
            title: 'Tên lớp',
            dataIndex: 'name',
        },
    ]

    const onSelectChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const onUpdateClassesToChallenge = () => {
        ChallengeApi.addClassToChallenge(get(dataClass, '_id'), selectedRowKeys).then(res => {
            console.log('🧙 ~ res', res)
        })
        // update
    }

    return (
        <>
            <Modal
                title="Cập nhật lớp"
                open={true}
                onOk={onCancel}
                // confirmLoading={confirmLoading}
                onCancel={onCancel}
                width={800}
                footer={
                    <>
                        <Button onClick={onCancel}>Đóng</Button>
                        <Button
                            className="bg-primary"
                            type="primary"
                            onClick={onCancel}
                            loading={loading}
                        >
                            Cập nhật
                        </Button>
                    </>
                }
            >
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    rowKey={record => get(record, '_id')}
                />
            </Modal>
        </>
    )
}

export default ModalUpdateClasses
