import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Button, Select } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

interface ICodeEditorProps {}

const { Option } = Select

const CodeEditor: React.FC<ICodeEditorProps> = props => {
    const [content, setContent] = useState<string | undefined>('')
    const [theme, setTheme] = useState('light')
    const [language, setLanguage] = useState('javascript')

    const handleChangeEditor = (value: string | undefined) => {
        setContent(value)
    }

    const handleChangeTheme = (value: string) => {
        setTheme(value)
    }

    const handleChangeLanguage = (value: string) => {
        setLanguage(value)
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-3 bg-gray-50 p-5">
                <div>
                    <span className="mr-2">Ngôn ngữ: </span>
                    <Select
                        value={theme}
                        onChange={handleChangeTheme}
                        className="w-36"
                    >
                        <Option value="light">Sáng</Option>
                        <Option value="vs-dark">Tối</Option>
                    </Select>

                    <Button
                        icon={<RedoOutlined />}
                        className="ml-2 rounded"
                    />
                </div>
                <div>
                <span className="mr-2">Theme: </span>
                    <Select
                        value={language}
                        onChange={handleChangeLanguage}
                        className="w-36"
                    >
                        <Option value="javascript">Javascript</Option>
                        <Option value="c">C</Option>
                    </Select>
                </div>
            </div>
            <div className="bg-gray-50">
                <Editor
                    className="h-[700px] w-full"
                    theme={theme}
                    language={language}
                    defaultValue={content}
                    saveViewState={false}
                    onChange={(value: string | undefined) => handleChangeEditor(value)}
                />
            </div>
        </div>
    )
}

export default CodeEditor
