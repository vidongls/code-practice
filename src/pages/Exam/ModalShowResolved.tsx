import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Button, Modal, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'

import { get, isEmpty } from 'lodash'
import { classNames } from '../../helper/helper'
import { Link } from 'react-router-dom'

interface IModalShowResultProps {
    data: any
    challengeTestCase: any
}

const ModalShowResolved: React.FC<IModalShowResultProps> = ({ data, challengeTestCase }) => {
    console.log('🧙 ~ data', data)
    const [countResolve, setCountResolve] = useState(0)

    useEffect(() => {
        const getCount = () => {
            const listResolve = data?.compileResult?.filter((item: any) => item?.status)
            setCountResolve(listResolve?.length || 0)
        }

        getCount()
    }, [data])

    return (
        <Modal
            title="Kết quả làm bài"
            open={true}
            footer={<></>}
            maskClosable={false}
            width={800}
            closable={false}
            cancelButtonProps={{ className: 'hidden' }}
        >
            <div className="mb-5 block text-center text-2xl">Bạn đã thực hiện bài tập này</div>
            <span className="block text-lg">
                Bạn đã vượt qua
                <span className="text-xl font-semibold">{` ${countResolve}/${challengeTestCase.length}`}</span> TestCase
            </span>

            <>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={'left'}
                    type="card"
                    className="mt-7 border"
                    items={data?.compileResult?.map((item: any, index: any) => {
                        return {
                            label: (
                                <>
                                    <div
                                        className={'flex justify-between p-1 text-base font-medium'}
                                        key={index}
                                    >
                                        <span
                                            className={classNames(' ', {
                                                'text-green-500': item?.status,
                                                'text-red-500': !item?.status,
                                            })}
                                        >
                                            Testcase {index + 1}
                                        </span>
                                        <span className="ml-2">
                                            {item?.status ? (
                                                <CheckOutlined className="anticon-custom text-green-500" />
                                            ) : (
                                                <CloseCircleOutlined className="anticon-custom text-red-500" />
                                            )}
                                        </span>
                                    </div>
                                </>
                            ),
                            key: index,
                            children: (
                                <div className="mb-4 py-8 pr-4">
                                    <span>Compiler Message</span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-3 ">
                                        {item?.data ? item.data : '~ Compiler Error'}
                                    </pre>

                                    <span>Input </span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                        {item?.testCaseInput}
                                    </pre>

                                    <span>Your Output</span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">{item?.data}</pre>

                                    <span>Expected Output</span>
                                    <pre className="mt-2 w-full bg-gray-100 p-2 font-semibold">
                                        {item?.expectedOutput}
                                    </pre>
                                </div>
                            ),
                        }
                    })}
                />
                <div className="mt-8 flex justify-end">
                    <Link to={'/'}>
                        <Button>Về trang chủ</Button>
                    </Link>
                </div>
            </>
        </Modal>
    )
}

export default ModalShowResolved
