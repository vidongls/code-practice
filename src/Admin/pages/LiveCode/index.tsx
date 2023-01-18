import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import { fireGet } from '../../../utils/firebaseUtil'
import { useParams } from 'react-router-dom'
import { get } from 'lodash'

type Props = {}

const AdminLiveCode = (props: Props) => {
    const { userId } = useParams()
    const [value, setValue] = useState('hello')

    useEffect(() => {
        const path = `live-code/user-${userId}`
        fireGet(path, (data: any) => {
            setValue(data?.content ?? '')
        })
    }, [userId])

    return (
        <div>
            <Editor
                theme={'light'}
                language={'javascript'}
                className="code-editor h-[500px] w-full border"
                saveViewState={false}
                // onChange={(value: any) => handleChangeEditor(value ?? '')}
                value={value}
                options={{ domReadOnly: true, readOnly: true }}
            />
        </div>
    )
}

export default AdminLiveCode
