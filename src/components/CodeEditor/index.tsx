import { RedoOutlined, CheckOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Editor from '@monaco-editor/react'
import { Button, Select } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { IDetail } from '../../pages/Challenge'

import { defineTheme, monacoThemes, TThemes } from './defineTheme'

interface IResult {
    data: string
    result: {
        status: boolean
        testCase: number
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

    const [content, setContent] = useState<string>('')
    const [theme, setTheme] = useState<any>('light')
    const [language, setLanguage] = useState('javascript')
    const [compileResult, setCompileResult] = useState<IResult>({} as IResult)
    const [loading, setLoading] = useState(false)

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
    return (
        <div className="p-2">
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
                        icon={<RedoOutlined />}
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
                        <Option value="cpp">C++</Option>
                    </Select>
                </div>
            </div>
            <div className="bg-gray-50 shadow-lg">
                <Editor
                    className="code-editor h-[700px] w-full"
                    theme={theme}
                    language={language}
                    defaultValue={content}
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
                    >
                        Submit code
                    </Button>
                </div>
            </div>

            <div className="border border-gray-200 bg-white p-7">
                {loading ? (
                    <span>Processing...</span>
                ) : (
                    compileResult?.data &&
                    detail?.testCase?.map((item, idx) => {
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
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-5 ">{compileResult.data}</pre>

                                    <span>Input </span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2">{item.input}</pre>

                                    <span>Your Output</span>
                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 ">{compileResult.data}</pre>

                                    <span>Expected Output</span>
                                    <pre className="mt-2 w-full bg-gray-100 p-2">{item.output}</pre>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default CodeEditor
