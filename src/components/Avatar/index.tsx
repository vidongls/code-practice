import React from 'react'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar as AvatarAnt } from 'antd'
import { Link } from 'react-router-dom'

interface IAvatarProps {
    src?: string
}

const Avatar: React.FC<IAvatarProps> = ({ src }) => {
    return src ? (
        <a
            href={src}
            target="_blank"
            rel="noreferrer"
        >
            <div className="h-12 w-12">
                <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>
        </a>
    ) : (
        <AvatarAnt icon={<UserOutlined />} />
    )
}

export default Avatar
