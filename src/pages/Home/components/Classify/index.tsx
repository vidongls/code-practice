import { TagsFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import Box from '../../../../components/Box'

interface IClassifyProps {
    children?: React.ReactNode
}

const Classify: React.FC<IClassifyProps> = ({ children }) => {
    return (
        <Box
            className="col-span-1 p-3"
            headerContent={
                <div className="flex items-center text-lg font-medium">
                    <TagsFilled className="mr-2" /> Phân loại bài tập
                </div>
            }>
            <div>
                {children}
                <div>
                    {Array.from('A23423BCDEFG').map(x => (
                        <Button
                            shape="round"
                            className="mr-2 mt-2">
                            {x}
                        </Button>
                    ))}
                </div>
            </div>
        </Box>
    )
}

export default Classify
