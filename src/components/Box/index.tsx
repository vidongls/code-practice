import React from 'react'
import { classNames } from '../../helper/helper'

interface IBoxProps {
    headerContent?: React.ReactNode
    children?: React.ReactNode
    className?: string
}

const Box: React.FC<IBoxProps> = ({ headerContent, children, className }) => {
    return (
        <div
            className={classNames('box', {
                [className || '']: className,
            })}
        >
            <div
                className={classNames('mb-3 flex items-center justify-between', {
                    hidden: !headerContent,
                })}
            >
                {headerContent}
            </div>
            {children}
        </div>
    )
}

export default Box
