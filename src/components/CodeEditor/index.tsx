import { RedoOutlined, CheckOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Editor from '@monaco-editor/react'
import { Button, Modal, notification, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { IDetail } from '../../pages/Challenge'

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
}

const { Option } = Select

const options = {
    minimap: { enabled: false },
    selectOnLineNumbers: true,
}
const CodeEditor: React.FC<ICodeEditorProps> = ({ detail }) => {
    const { id: challengeId } = useParams()

    const [content, setContent] = useState('')
    const [theme, setTheme] = useState<any>('light')
    const [language, setLanguage] = useState('javascript')
    const [compileResult, setCompileResult] = useState<IResult>({} as IResult)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setContent(detail.content)
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

    const confirmSubmit = () => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn nộp bài?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                return ChallengeApi.submitChallenge({ challengeId, answerContent: content })
                    .then(res => {
                        console.log('🧙 ~ res', res.data?.data)
                        setCompileResult(res.data?.dataCompile)
                        notification.success({ message: 'Nộp bài thành công' })
                    })
                    .catch(error => {
                        notification.error({ message: 'Nộp bài thất bại' })
                    })
            },
            cancelText: 'Quay lại',
            okText: 'Nộp',
        })
    }

    return (
        <div className="p-2 w-full">
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
                    <Select
                        value={language}
                        onChange={handleChangeLanguage}
                        className="w-36"
                    >
                        <Option value="javascript">Javascript</Option>
                        {/* <Option value="cpp">C++</Option> */}
                    </Select>
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
            <div className="mt-4 flex items-center justify-between p-4">
                <div>Upload</div>
                <div>
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
                </div>
            </div>

            <div className="border border-gray-200 bg-white p-7">
                {loading ? (
                    <span>Processing...</span>
                ) : compileResult.success ? (
                    compileResult?.result?.map((item, idx) => {
                        return (
                            <div
                                className="mb-4 grid grid-cols-3 gap-6 border-b pb-14"
                                key={idx}
                            >
                                <div>
                                    <div className="border bg-slate-100 p-3 text-base font-medium">
                                        Testcase {idx}
                                        <span className="ml-2">
                                            {compileResult?.result ? (
                                                compileResult?.result[idx].status ? (
                                                    <CheckOutlined className="anticon-custom text-green-500" />
                                                ) : (
                                                    <CloseCircleOutlined className="anticon-custom text-red-500" />
                                                )
                                            ) : null}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span>Compiler Message</span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-5 ">{item.data}</pre>

                                    <span>Input </span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2">{item.testCaseInput}</pre>

                                    <span>Your Output</span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 ">{item.data}</pre>

                                    <span>Expected Output</span>
                                    <pre className="mt-2 w-full bg-gray-100 p-2">{item.expectedOutput}</pre>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 ">{compileResult.err}</pre>
                )}
            </div>
        </div>
    )
}

export default CodeEditor
