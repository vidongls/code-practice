import type { RadioChangeEvent } from 'antd'
import React, { useState } from 'react'
import CodeEditor from '../../components/CodeEditor'
import Tabs from '../../components/Tabs'
import Description from './components/Description'
import Header from './components/Header'

interface IChallengeProps {}

const Challenge: React.FC<IChallengeProps> = props => {
    const items = [
        { label: 'Thông tin', key: 'info', content: <Description /> },
        { label: 'Thảo luận', key: 'discussion', content: 'dis' },
        { label: 'Bảng xếp hạng', key: 'ranking', content: 'bxh' },
    ]

    return (
        <div className="bg-white">
            <Header />
            <div className="grid h-[calc(100vh_-_50px)] grid-cols-2 bg-white ">
                <div className="overflow-y-auto">
                    <Tabs items={items} />
                </div>

                <CodeEditor />
            </div>
        </div>
    )
}

export default Challenge
