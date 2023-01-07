import { RedoOutlined, CheckOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Editor from '@monaco-editor/react'
import { Button, Modal, notification, Select, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { classNames } from '../../helper/helper'
import { IDetail } from '../../pages/Challenge'
import ModalShowResult from '../../pages/Challenge/components/ModalShowResult'

import { defineTheme, monacoThemes, TThemes } from './defineTheme'

interface IResult {
    data: string
    success: boolean
    err: String
    result: {
        data: string
        status: boolean
        testCaseInput: string
        expectedOutput: string
    }[]
}

interface ICodeEditorProps {
    detail: IDetail
    isEnded: boolean
}

const { Option } = Select

const options = {
    minimap: { enabled: false },
    selectOnLineNumbers: true,
}
const CodeEditor: React.FC<ICodeEditorProps> = ({ detail, isEnded }) => {
    const { id: challengeId } = useParams()

    const [content, setContent] = useState('')
    const [defaultContent, setDefaultContent] = useState('')
    const [theme, setTheme] = useState<any>('light')
    const [language, setLanguage] = useState('javascript')
    const [compileResult, setCompileResult] = useState<IResult>({} as IResult)

    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setDefaultContent(detail?.content)
        // setContent(detail?.content)
    }, [detail.content])

    const handleChangeEditor = (value: string) => {
        setContent(value)
    }

    const handleChangeTheme = (value: TThemes) => {
        if (['light', 'vs-dark'].includes(value)) {
            setTheme(value)
        } else {
            defineTheme(value).then(_ => setTheme(value))
        }
    }

    const handleChangeLanguage = (value: string) => {
        setLanguage(value)
    }

    const onRunCode = async () => {
        if (!content) {
            return
        }
        const data = {
            challengeId,
            content,
        }

        setLoading(true)
        try {
            const res = await ChallengeApi.compile(data)
            setCompileResult(res.data)
        } catch (error) {
            console.log('🚀 🐢 ~ error', error)
        } finally {
            setLoading(false)
        }
    }

    const handleVisibleSubmitModal = () => {
        setIsVisible(true)
    }

    const handleHideSubmitModal = () => {
        setIsVisible(false)
    }

    const confirmSubmit = () => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn nộp bài?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                return ChallengeApi.submitChallenge({ challengeId, answerContent: content })
                    .then(res => {
                        setCompileResult(res.data?.dataCompile)
                        handleVisibleSubmitModal()
                    })
                    .catch(error => {
                        notification.error({ message: 'Nộp bài thất bại' })
                    })
            },

            cancelText: 'Quay lại',
            okText: 'Nộp',
        })
    }

    const itemFail = compileResult?.result?.find(item => !item.status)

    const listSuccess = compileResult?.result?.filter(item => item.status)

    return (
        <>
            <div className="w-full p-2">
                <div className="flex items-center justify-between gap-3 bg-gray-50 p-5">
                    <div>
                        <span className="mr-2">Theme: </span>
                        <Select
                            value={theme}
                            onChange={handleChangeTheme}
                            className="w-36"
                        >
                            <Option value="light">Sáng</Option>
                            <Option value="vs-dark">Tối</Option>
                            {Object.entries(monacoThemes).map(([key, val]) => (
                                <Option
                                    value={key}
                                    key={key}
                                >
                                    {val}
                                </Option>
                            ))}
                        </Select>

                        <Button
                            icon={<RedoOutlined className="mt-1" />}
                            className="ml-2 rounded"
                        />
                    </div>
                    <div>
                        <span className="mr-2">Ngôn ngữ: </span>

                        <span className="font-semibold">Javascript</span>
                    </div>
                </div>
                <div className="bg-gray-50 shadow-lg">
                    <Editor
                        className="code-editor h-[700px] w-full"
                        theme={theme}
                        language={language}
                        value={content}
                        saveViewState={false}
                        options={options}
                        onChange={(value: any) => handleChangeEditor(value ?? '')}
                    />
                </div>
                <div className="mt-4 flex items-center justify-end p-4">
                    <div>
                        {!isEnded && (
                            <>
                                <Button
                                    className="mr-2 h-9 rounded-sm border-none shadow-lg shadow-gray-300"
                                    onClick={onRunCode}
                                    loading={loading}
                                >
                                    Run code
                                </Button>
                                <Button
                                    type="primary"
                                    className="h-9 rounded-sm bg-primary shadow-lg"
                                    onClick={confirmSubmit}
                                >
                                    Nộp bài
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="border border-gray-200 bg-white p-7">
                    {loading ? (
                        <span>Đang xử lý...</span>
                    ) : compileResult?.success ? (
                        <>
                            {/* {listSuccess &&
                                listSuccess.map((item, index) => {
                                    return (
                                        <div
                                            className="mb-4 grid grid-cols-3 gap-6 border-b pb-8"
                                            key={index}
                                        >
                                            <div className="flex justify-between border border-green-400 p-2 text-base font-medium">
                                                Testcase
                                                <span className="ml-2">
                                                    <CloseCircleOutlined className="anticon-custom text-green-400" />
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}

                            {itemFail && (
                                <div className="mb-4 grid grid-cols-3 gap-6 border-b pb-8">
                                    <div>
                                        <div className="flex justify-between border border-red-500 p-2 text-base font-medium">
                                            Testcase
                                            <span className="ml-2">
                                                <CloseCircleOutlined className="anticon-custom text-red-500" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <span>Compiler Message</span>
                                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-3 ">{itemFail?.data}</pre>

                                        <span>Input </span>
                                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                            {itemFail?.testCaseInput}
                                        </pre>

                                        <span>Your Output</span>
                                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                            {itemFail?.data}
                                        </pre>

                                        <span>Expected Output</span>
                                        <pre className="mt-2 w-full bg-gray-100 p-2 font-semibold">
                                            {itemFail?.expectedOutput}
                                        </pre>
                                    </div>
                                </div>
                            )} */}
                            <Tabs
                                defaultActiveKey="1"
                                tabPosition={'left'}
                                type="card"
                                className="border"
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
                                                <pre className="mt-2 mb-5 w-full bg-gray-100 p-3 ">{item?.data}</pre>

                                                <span>Input </span>
                                                <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                    {item?.testCaseInput}
                                                </pre>

                                                <span>Your Output</span>
                                                <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                    {item?.data}
                                                </pre>

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
                    ) : (
                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 ">{compileResult?.err}</pre>
                    )}
                </div>
            </div>

            {isVisible && (
                <ModalShowResult
                    compileResult={compileResult}
                    handleHideSubmitModal={handleHideSubmitModal}
                />
            )}
        </>
    )
}

export default CodeEditor
