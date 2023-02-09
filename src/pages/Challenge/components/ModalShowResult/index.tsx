import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Modal, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'

import { classNames } from '../../../../helper/helper'
import { get, isEmpty } from 'lodash'

interface IModalShowResultProps {
    compileResult: any
    handleHideSubmitModal: () => void
    dataSubmit: any
}

const ModalShowResult: React.FC<IModalShowResultProps> = ({ compileResult, handleHideSubmitModal, dataSubmit }) => {
    const [countResolve, setCountResolve] = useState(0)

    useEffect(() => {
        const getCount = () => {
            const listResolve = compileResult?.result?.filter((item: any) => item?.status)
            setCountResolve(listResolve?.length || 0)
        }

        getCount()
    }, [compileResult])

    return (
        <Modal
            title="Kết quả làm bài"
            open={true}
            onCancel={handleHideSubmitModal}
            footer={<></>}
            maskClosable={false}
            width={800}
        >
            <span className="block text-lg">
                Bạn đã vượt qua
                <span className="text-xl font-semibold">{` ${countResolve}/${
                    get(dataSubmit, 'challengeTestCase', []).length
                }`}</span>{' '}
                TestCase
            </span>

            <>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={'left'}
                    type="card"
                    className="mt-7 border"
                    items={compileResult?.result.map((item: any, index: any) => {
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
                                        {compileResult?.err ? compileResult.err : item?.data}
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
            </>
        </Modal>
    )
}

export default ModalShowResult
