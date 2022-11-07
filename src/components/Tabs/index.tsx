import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChallengeApi from '../../Api/Challenge/ChallengeApi'
import { classNames } from '../../helper/helper'

interface IItems {
    label: string
    key: string
    content: React.ReactNode
}

interface ITabsProps {
    items: IItems[]
}

const Tabs: React.FC<ITabsProps> = ({ items }) => {
    const [key, setKey] = useState<string>(items[0].key)

    return (
        <div className="challenge-tabs flex h-full">
            <ul className="challenge-tabs__list border-r">
                {items.map(item => (
                    <li
                        className={classNames(
                            'challenge-tabs__item cursor-pointer border-b px-3 py-7 font-semibold transition duration-200',
                            {
                                'bg-white text-primary': key === item.key,
                                'bg-gray-100 hover:bg-gray-50': key !== item.key,
                            }
                        )}
                        key={item.key}
                        onClick={() => setKey(item.key)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="w-full px-7 py-4">
                {items.map(item => (item.key === key ? <div key={item.key}>{item.content}</div> : null))}
            </div>
        </div>
    )
}

export default Tabs
