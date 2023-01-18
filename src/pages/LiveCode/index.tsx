import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import { fireSet } from '../../utils/firebaseUtil'
import { useAuthStore } from '../../store/useAuthStore'

const LiveCode = () => {
    const { user } = useAuthStore()

    const onChangeEditor = (value: string) => {
        const path = `live-code/user-${user.id}`
        fireSet(path, { content: value })
    }

    return (
        <div>
            <Editor
                theme={'light'}
                language={'javascript'}
                className="code-editor h-[500px] w-full border"
                saveViewState={false}
                onChange={value => onChangeEditor(value as string)}
            />
        </div>
    )
}

export default LiveCode
