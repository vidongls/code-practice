import { Button, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import CommentApi from '../../../../Api/Comment/CommentApi'
import { formatDate } from '../../../../helper/helper'

export interface IComment {
    _id: string
    author: {
        userName: string
        avatar: string
    }
    content: string
    createdAt: string
}

interface ICommentProps {
    challengeId: string
    comments: IComment[]
    refetch: () => void
}

const Comment: React.FC<ICommentProps> = ({ challengeId, comments, refetch }) => {
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const handleSendComment = () => {
        form.validateFields().then(values => {
            setLoading(true)

            CommentApi.sendComment({ challengeId, ...values })
                .then(res => {
                    form.resetFields()
                    refetch()
                    notification.success({ message: 'Gửi bình luận thành công!' })
                })
                .catch(() => {
                    notification.error({ message: 'Có lỗi xảy ra!' })
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold">Bình luận</h2>

            <div className="mt-8">
                <Form
                    className="mb-6"
                    form={form}
                >
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Không được để trống!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            // className="h-full w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                            className=" rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 "
                            placeholder="Điền bình luận..."
                            rows={4}
                        />
                    </Form.Item>

                    <Button
                        className="  inline-flex items-center rounded-lg bg-primary py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-2"
                        onClick={handleSendComment}
                        loading={loading}
                    >
                        Bình luận
                    </Button>
                </Form>
            </div>
            <div className="mt-12">
                {comments?.map(comment => (
                    <div
                        className="mt-4 flex flex-col border-b pb-4"
                        key={comment._id}
                    >
                        <div className="flex items-center">
                            <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                                <img
                                    className="mr-2 h-6 w-6 rounded-full"
                                    src={
                                        comment?.author?.avatar ||
                                        'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                                    }
                                    alt="Michael Gough"
                                />
                                {comment?.author?.userName}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                <time
                                    dateTime="2022-02-08"
                                    title="February 8th, 2022"
                                >
                                    {formatDate(comment.createdAt)}
                                </time>
                            </p>
                        </div>
                        <p className="py-3 text-gray-500 dark:text-gray-400">{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comment
