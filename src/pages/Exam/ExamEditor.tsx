import { CheckOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Editor from '@monaco-editor/react'
import { Button, Modal, notification, Select, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { classNames } from '../../helper/helper'
import { IDetail } from '../../pages/Challenge'
import ModalShowResult from '../../pages/Challenge/components/ModalShowResult'
import { defineTheme, monacoThemes, TThemes } from '../../components/CodeEditor/defineTheme'
import { fireSet } from '../../utils/firebaseUtil'
import { useAuthStore } from '../../store/useAuthStore'
import { useDebounce } from '../../hooks/useDebounce'
import ExamModalShowResult from './ExamModalShowResult'
import { get } from 'lodash'

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

interface IExamCodeEditorProps {
    detail: IDetail
    isEnded: boolean
}

const { Option } = Select

const options = {
    minimap: { enabled: false },
    selectOnLineNumbers: true,
}
const ExamCodeEditor: React.FC<IExamCodeEditorProps> = ({ detail, isEnded }) => {
    const { challengeId, classId } = useParams()
    const { user } = useAuthStore()

    const [content, setContent] = useState('')
    const [theme, setTheme] = useState<any>('light')
    const [language, setLanguage] = useState('javascript')
    const [compileResult, setCompileResult] = useState<IResult>({} as IResult)
    const [dataSubmit, setDataSubmit] = useState({} as any)

    const [dataResolve, setDataResolve] = useState(false)

    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setContent(detail?.content)
    }, [detail.content])

    const debouncedSearchTerm = useDebounce(content, 100)

    // Effect for API call
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                const path = `classes/${classId}/challenge-${challengeId}/students/${user.id}`
                fireSet(path, {
                    status: 'PROCESSING',
                    content: debouncedSearchTerm,
                    id: user.id,
                })
            }
        },
        [challengeId, classId, debouncedSearchTerm, user.id] // Only call effect if debounced search term changes
    )

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
            content: '',
            onOk() {
                return ChallengeApi.submitExamChallenge({ challengeId, answerContent: content })
                    .then(res => {
                        setDataSubmit(res.data)
                        setCompileResult(res.data?.dataCompile)
                        handleVisibleSubmitModal()
                        const path = `classes/${classId}/challenge-${challengeId}/students/${user.id}`
                        fireSet(path, {
                            status: 'SUCCESS',
                            content: debouncedSearchTerm,
                            id: user.id,
                            compileResult: res.data?.dataCompile,
                        })
                    })
                    .catch(error => {
                        const { response } = error

                        if (get(response, 'data.code') === 'RESOLVED') {
                            notification.error({ message: 'Bạn đã làm bài này' })
                        } else {
                            notification.error({ message: 'Nộp bài thất bại' })
                        }
                    })
            },

            cancelText: 'Quay lại',
            okText: 'Nộp',
            okButtonProps: { className: 'bg-blue-400' },
        })
    }

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
                <ExamModalShowResult
                    compileResult={compileResult}
                    handleHideSubmitModal={handleHideSubmitModal}
                    dataSubmit={dataSubmit}
                />
            )}
        </>
    )
}

export default ExamCodeEditor
