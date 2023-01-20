import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import { fireGet, fireGetOne } from '../../../utils/firebaseUtil'
import { Link, useParams } from 'react-router-dom'
import { find, findKey, get, isEmpty } from 'lodash'
import ChallengeApi from '../../../Api/Challenge/ChallengeApi'
import { ArrowLeftOutlined, CheckOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ClassApi from '../../../Api/Class/ClassApi'
import { classNames } from '../../../helper/helper'

type Props = {}

const AdminLiveCode = (props: Props) => {
    const { classId, studentId } = useParams()
    const [value, setValue] = useState('')
    const [challengeStarted, setChallengeStarted] = useState('')
    const [challenge, setChallenge] = useState({} as any)
    const [userDoing, setUserDoing] = useState({} as any)
    const [compileResult, setCompileResult] = useState({} as any)

    useEffect(() => {
        const path = `classes/${classId}`
        fireGetOne(path).then((data: any) => {
            if (!isEmpty(data)) {
                const dataStartedKeys = findKey(data, 'started')
                setChallengeStarted(dataStartedKeys as string)
            }
            // setValue(data?.content ?? '')
        })
    }, [classId])

    useEffect(() => {
        fireGet(`classes/${classId}/${challengeStarted}/students/${studentId}`, data => {
            if (!isEmpty(data)) {
                setValue(get(data, 'content', ''))
                setCompileResult(get(data, 'compileResult', []))
            }
        })
    }, [challengeStarted, classId, studentId])

    useEffect(() => {
        if (challengeStarted) {
            ChallengeApi.getOne(challengeStarted.split('-')[1]).then(res => {
                setChallenge(res.data)
            })
        }
    }, [challengeStarted])

    useEffect(() => {
        ClassApi.getStudentsInfo({ studentId }).then(res => {
            setUserDoing(get(res, 'data.student', {}))
        })
    }, [studentId])

    return (
        <div>
            {challenge && challenge?.content && (
                <div className="h-full w-full py-5 px-7">
                    <div className="my-6 mt-0 flex items-center justify-between">
                        <div>
                            <Link
                                to={-1 as any}
                                className="mb-2 flex w-fit items-center"
                            >
                                <ArrowLeftOutlined className="mr-2" />
                                Trở về
                            </Link>
                        </div>
                    </div>
                    <div className="grid max-h-[800px] min-h-[750px] grid-cols-2 overflow-y-auto bg-white p-3">
                        <div className="col-span-1 overflow-y-auto">
                            <div className="mt-4 mr-2 border-gray-200 bg-white p-4">
                                <div className="mb-4">
                                    Sinh viên:{' '}
                                    {`${get(userDoing, 'firstName', '-')} ${get(userDoing, 'lastName', '-')}`} -{' '}
                                    <span>Mã sinh viên: {get(userDoing, 'code', '-')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="mb-5 text-2xl font-medium">{challenge?.title}</h3>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: challenge?.describe }}></div>
                            </div>
                        </div>

                        <div className="col-span-1 border-l">
                            <div className="w-full p-2">
                                <Editor
                                    theme={'light'}
                                    language={'javascript'}
                                    className="code-editor h-[400px] w-full border py-6"
                                    saveViewState={false}
                                    // onChange={(value: any) => handleChangeEditor(value ?? '')}
                                    value={value}
                                    options={{ domReadOnly: true, readOnly: true, minimap: { enabled: false } }}
                                />
                                {!isEmpty(compileResult) && (
                                    <Tabs
                                        defaultActiveKey="1"
                                        tabPosition={'left'}
                                        type="card"
                                        className="mt-7 border"
                                        items={compileResult?.result.map((item: any, index: any) => {
                                            return {
                                                label: (
                                                    <>
                                                        <div
                                                            className={'flex justify-between p-1 text-base font-medium'}
                                                            key={index}
                                                        >
                                                            <span
                                                                className={classNames(' ', {
                                                                    'text-green-500': item?.status,
                                                                    'text-red-500': !item?.status,
                                                                })}
                                                            >
                                                                Testcase {index + 1}
                                                            </span>
                                                            <span className="ml-2">
                                                                {item?.status ? (
                                                                    <CheckOutlined className="anticon-custom text-green-500" />
                                                                ) : (
                                                                    <CloseCircleOutlined className="anticon-custom text-red-500" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </>
                                                ),
                                                key: index,
                                                children: (
                                                    <div className="mb-4 py-8 pr-4">
                                                        <span>Compiler Message</span>
                                                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-3 ">
                                                            {compileResult?.err ? compileResult.err : item?.data}
                                                        </pre>

                                                        <span>Input </span>
                                                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                            {item?.testCaseInput}
                                                        </pre>

                                                        <span>Your Output</span>
                                                        <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                            {item?.data}
                                                        </pre>

                                                        <span>Expected Output</span>
                                                        <pre className="mt-2 w-full bg-gray-100 p-2 font-semibold">
                                                            {item?.expectedOutput}
                                                        </pre>
                                                    </div>
                                                ),
                                            }
                                        })}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        // <div>
        //     <Editor
        //         theme={'light'}
        //         language={'javascript'}
        //         className="code-editor h-[500px] w-full border"
        //         saveViewState={false}
        //         // onChange={(value: any) => handleChangeEditor(value ?? '')}
        //         value={value}
        //         options={{ domReadOnly: true, readOnly: true }}
        //     />
        // </div>
    )
}

export default AdminLiveCode
