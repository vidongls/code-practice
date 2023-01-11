import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Spin, Tabs, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import { setDocumentTitle } from '../../../../helper/helper'
import { useNavigatorStore } from '../../../../store/useNavigatorStore'

interface IAdminChallengeDetailProps {}

const { Paragraph } = Typography

const AdminChallengeDetail: React.FC<IAdminChallengeDetailProps> = props => {
    const { setNavigator } = useNavigatorStore()
    const navigate = useNavigate()
    let { id } = useParams()

    const [data, setData] = useState({} as any)
    const [loadingPage, setLoadingPage] = useState(false)

    useEffect(() => {
        const getDetail = () => {
            setLoadingPage(true)
            ChallengeApi.getOne(id!)
                .then(res => {
                    setData(res.data)
                })
                .catch(() => {})
                .finally(() => {
                    setLoadingPage(false)
                })
        }
        getDetail()
    }, [id])

    useEffect(() => {
        setDocumentTitle('Chi tiết bài tập')
        setNavigator({
            title: 'Challenge',
            navigator: [
                {
                    name: 'Bài tập',
                    to: '/admin/challenge',
                },
                {
                    name: 'Chi tiết bài tập',
                },
            ],
        })
    }, [])

    return (
        <Spin spinning={loadingPage}>
            {data && data.content && (
                <div className="h-full w-full py-5 px-7">
                    <div className="my-6 mt-0 flex items-center justify-between">
                        <div>
                            <Link
                                to={'/admin/challenge'}
                                className="mb-2 flex w-fit items-center"
                            >
                                <ArrowLeftOutlined className="mr-2" />
                                Trở về Danh Sách Challenge
                            </Link>
                        </div>
                        <Link to={`/admin/challenge/edit/${id}`}>
                            <Button
                                type="primary"
                                className="rounded bg-primary font-medium"
                            >
                                <EditOutlined className="anticon-custom" />
                                Chỉnh sửa challenge
                            </Button>
                        </Link>
                    </div>
                    <div className="grid max-h-[800px] min-h-[750px] grid-cols-2 overflow-y-auto bg-white p-3">
                        <div className="col-span-1 overflow-y-auto">
                            <div className="mt-4 mr-2 border-gray-200 bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="mb-5 text-2xl font-medium">{data?.title}</h3>
                                    <Paragraph
                                        copyable={{
                                            tooltips: ['Copy', 'Đã Copy!'],
                                            text: `${data?.title} ${data?.describe}`,
                                        }}
                                    />
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data?.describe }}></div>
                            </div>
                        </div>

                        <div className="col-span-1 border-l">
                            <div className="h-full w-full p-2">
                                <CopyBlock
                                    language={'javascript'}
                                    text={data?.content}
                                    showLineNumbers={true}
                                    theme={dracula}
                                    wrapLines={true}
                                    codeBlock
                                />
                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition={'left'}
                                    type="card"
                                    className="mt-7 border"
                                    items={data?.testCase.map((item: any, index: any) => {
                                        return {
                                            label: (
                                                <>
                                                    <div
                                                        className={' p-1 text-base font-medium'}
                                                        key={index}
                                                    >
                                                        <span>Testcase {index + 1}</span>
                                                    </div>
                                                </>
                                            ),
                                            key: index,
                                            children: (
                                                <div className="mb-4 py-8 pr-4">
                                                    <span>Input </span>
                                                    <pre className="mt-2 mb-5 w-full bg-gray-100 p-2 font-semibold">
                                                        {item?.input}
                                                    </pre>

                                                    <span>Output</span>
                                                    <pre className="mt-2 w-full bg-gray-100 p-2 font-semibold">
                                                        {item?.input}
                                                    </pre>
                                                </div>
                                            ),
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Spin>
    )
}

export default AdminChallengeDetail
