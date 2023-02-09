import { Button, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import CountDown from '../../../../components/CountDown/CountDown'
import { isEmpty, isNil } from 'lodash'
import ModalShowResolved from '../../ModalShowResolved'

interface IDescriptionProps {
    loading: boolean
    detail: any
    isEnded: boolean
    dataRealtime: any
    dataDoingResolved: any
}

const Description: React.FC<IDescriptionProps> = ({ loading, detail, isEnded, dataRealtime, dataDoingResolved }) => {
  
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onComplete = () => {
        showModal()
    }

    return Object.keys(detail).length ? (
        <Spin spinning={loading}>
            <div className="flex items-center justify-between">
                <h2 className="mb-5 text-2xl font-medium">{detail.title}</h2>

                {!isEmpty(detail) && !isEmpty(dataRealtime)
                    ? detail.isRealtime && (
                          <CountDown
                              startTime={dataRealtime?.startTime}
                              duration={detail.time}
                              className="text-xl"
                              onComplete={onComplete}
                          />
                      )
                    : null}
            </div>

            <div dangerouslySetInnerHTML={{ __html: detail.describe }}></div>
            
        </Spin>
    ) : null
}

export default Description
