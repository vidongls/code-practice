import React, { useEffect, useState } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { Button, Select } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import monacoThemes from 'monaco-themes/themes/themelist.json'
import { defineTheme, TThemes } from './defineTheme'

interface ICodeEditorProps {}

const { Option } = Select
const options = {
    minimap: { enabled: false },
}
const CodeEditor: React.FC<ICodeEditorProps> = props => {
    const [content, setContent] = useState<string | undefined>('')
    const [theme, setTheme] = useState<TThemes>('light')
    const [language, setLanguage] = useState('javascript')

    const handleChangeEditor = (value: string | undefined) => {
        setContent(value)
    }

    const handleChangeTheme = (value: TThemes) => {
        if (['light', 'vs-dark'].includes(value)) {
            setTheme(theme)
        } else {
            defineTheme(value).then(_ => setTheme(theme))
        }
        setTheme(value)
    }

    const handleChangeLanguage = (value: string) => {
        setLanguage(value)
    }

    useEffect(() => {
        defineTheme('amy').then(_ => setTheme('amy'))
    }, [])

    return (
        <div>
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
            <div className="bg-gray-50">
                <Editor
                    className="h-[700px] w-full"
                    theme={theme}
                    language={language}
                    defaultValue={content}
                    saveViewState={false}
                    options={options}
                    onChange={(value: string | undefined) => handleChangeEditor(value)}
                />
            </div>
        </div>
    )
}

export default CodeEditor
