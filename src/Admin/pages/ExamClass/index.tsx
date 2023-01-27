import React, { useEffect } from 'react'
import List from './List'
import { setDocumentTitle } from '../../../helper/helper'

const ExamClass = () => {
    useEffect(() => {
        setDocumentTitle('Lớp thi')
    }, [])

    return (
        <div className="h-full w-full py-8 px-7">
            <div className="my-6 mt-0 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Lớp đang thi</h3>
            </div>

            <List />
        </div>
    )
}

export default ExamClass
