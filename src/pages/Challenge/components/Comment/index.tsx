import { Button, Form, Input } from 'antd'
import React from 'react'
import CommentApi from '../../../../Api/Comment/CommentApi'

interface ICommentProps {
    challengeId: String
}

const Comment: React.FC<ICommentProps> = ({ challengeId }) => {
    const [form] = Form.useForm()

    const handleSendComment = () => {
        form.validateFields().then(values => {
            CommentApi.sendComment({ challengeId, ...values }).then(res => {
                console.log('🧙 ~ res', res)
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
                    >
                        Bình luận
                    </Button>
                </Form>
            </div>
            <div className="mt-12">
                <div className="flex flex-col border-b pb-4">
                    <div className="flex items-center">
                        <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                            <img
                                className="mr-2 h-6 w-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough"
                            />
                            Michael Gough
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time
                                dateTime="2022-02-08"
                                title="February 8th, 2022"
                            >
                                Feb. 8, 2022
                            </time>
                        </p>
                    </div>
                    <p className="py-3 text-gray-500 dark:text-gray-400">
                        Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment
