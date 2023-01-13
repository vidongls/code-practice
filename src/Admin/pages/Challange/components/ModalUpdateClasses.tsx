import { Button, Modal, Table, Space, Input } from 'antd'
import { get } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import ClassApi from '../../../../Api/Class/ClassApi'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import {
    BarChartOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlayCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons'

interface IModalUpdateClassesProps {
    onCancel: () => void
    dataClass: any
}

const ModalUpdateClasses: React.FC<IModalUpdateClassesProps> = ({ dataClass, onCancel }) => {
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    const [visibleSearch, setVisibleSearch] = useState(false)

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

    const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: any) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, visible }) => (
            <div
                style={{ padding: 8 }}
                onKeyDown={e => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        className="bg-primary"
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            if (clearFilters) {
                                handleReset(clearFilters)
                            }
                            confirm({ closeDropdown: true })
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            // close()
                            confirm({ closeDropdown: true })
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    })

    const columns = [
        {
            title: 'Mã lớp',
            dataIndex: 'code',
            ...getColumnSearchProps('code'),
        },
        {
            title: 'Tên lớp',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
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
