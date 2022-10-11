import { Radio, Space, Tabs } from 'antd'
import type { RadioChangeEvent } from 'antd'
import React, { useState } from 'react'
import Header from './components/Header'

interface IChallengeProps {}

type TabPosition = 'left' | 'right' | 'top' | 'bottom'

const Challenge: React.FC<IChallengeProps> = props => {
    const [tabPosition, setTabPosition] = useState<TabPosition>('left')

    const changeTabPosition = (e: RadioChangeEvent) => {
        setTabPosition(e.target.value)
    }

    return (
        <div className="bg-white">
            <Header />
            <div className="grid grid-cols-2 bg-white">
                <div className="h-96">
                    <Tabs
                        className="h-full challenge-tab"
                        tabPosition="left"
                        items={[
                            {
                                label: `Tab 1`,
                                key: '1',
                                children: <>asd</>,
                            },
                            {
                                label: `Tab 2`,
                                key: '2',
                                children: `Content of Tab Pane 2`,
                            },
                            {
                                label: `Tab 3`,
                                key: '3',
                                children: `Content of Tab Pane 3`,
                            },
                        ]}
                    />
                </div>
                <div>sad</div>
            </div>
        </div>
    )
}

export default Challenge
