import { Spin } from 'antd'
import React from 'react'

import { IDetail } from '../..'
import CountDown from '../../../../components/CountDown/CountDown'

interface IDescriptionProps {
    loading: boolean
    detail: IDetail
}

const Description: React.FC<IDescriptionProps> = ({ loading, detail }) => {
    return (
        <Spin spinning={loading}>
            <div className="flex items-center justify-between">
                <h2 className="mb-5 text-2xl font-medium">{detail.title}</h2>
                {detail.isRealtime && (
                    <CountDown
                        startTime={new Date().getTime()}
                        duration={detail.time}
                        className="text-xl"
                    />
                )}
            </div>

            <div dangerouslySetInnerHTML={{ __html: detail.describe }}></div>
        </Spin>
    )
}

export default Description
