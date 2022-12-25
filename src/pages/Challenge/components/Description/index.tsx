import { Button, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { IDetail } from '../..'
import CountDown from '../../../../components/CountDown/CountDown'

interface IDescriptionProps {
    loading: boolean
    detail: IDetail
    isEnded: boolean
}

const Description: React.FC<IDescriptionProps> = ({ loading, detail, isEnded }) => {
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

   

    return (
        <Spin spinning={loading}>
            <div className="flex items-center justify-between">
                <h2 className="mb-5 text-2xl font-medium">{detail.title}</h2>
                {detail.isRealtime && (
                    <CountDown
                        startTime={new Date().getTime()}
                        duration={detail.time}
                        className="text-xl"
                        onComplete={onComplete}
                    />
                )}
            </div>

            <div dangerouslySetInnerHTML={{ __html: detail.describe }}></div>
            {(isEnded || isModalOpen) && (
                <Modal
                    title={false}
                    open={true}
                    onOk={handleOk}
                    footer={false}
                    closable={false}
                >
                    <p className="text-2xl font-medium text-center">Bài thi đã kết thúc!</p>
                    <div className="mt-8 flex justify-end">
                        <Link to={'/'}>
                            <Button>Về trang chủ</Button>
                        </Link>
                    </div>
                </Modal>
            )}
        </Spin>
    )
}

export default Description
