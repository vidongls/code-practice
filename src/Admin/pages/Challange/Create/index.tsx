import { Button, Form, Input, InputNumber, notification, Select, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'

import Editor from '@monaco-editor/react'
import { setDocumentTitle } from '../../../../helper/helper'
import { useNavigatorStore } from '../../../../store/useNavigatorStore'
interface IChallengeCreateProps {}

const ChallengeCreate: React.FC<IChallengeCreateProps> = props => {
    const { setNavigator } = useNavigatorStore()
    const [form] = Form.useForm()
    const isRealtime = Form.useWatch('isRealtime', form)

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState(15)
    const navigate = useNavigate()

    useEffect(() => {
        setDocumentTitle('Tạo bài tập')
        setNavigator({
            title: 'Challenge',
            navigator: [
                {
                    name: 'Bài tập',
                    to: '/admin/challenge',
                },
                {
                    name: 'Tạo mới bài tập',
                },
            ],
        })
    }, [])

    const handleCreate = () => {
        form.validateFields().then(values => {
            setLoading(true)
            ChallengeApi.create({ ...values, time: (time || 15) * 1000 * 60 })
                .then(res => {
                    notification.success({ message: 'Tạo mới thành công' })
                    navigate('/admin/challenge')
                })
                .catch(err => {
                    notification.error({ message: 'Tạo mới thất bại' })
                })
                .finally(() => setLoading(false))
        })
    }

    const onChangeTime = (value: any) => {
        setTime(!!value ? parseInt(value) : 15)
    }

    return (
        <div className="flex h-full w-full justify-center p-4">
            <div className="w-3/4 rounded-md bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        to={'/admin/challenge'}
                        className="flex w-fit items-center"
                    >
                        <ArrowLeftOutlined className="mr-2" />
                        Trở về Danh Sách bài tập
                    </Link>

                    <Button
                        type="primary"
                        className="rounded bg-primary font-medium"
                        loading={loading}
                        onClick={handleCreate}
                    >
                        <PlusOutlined className="anticon-custom" /> Tạo mới
                    </Button>
                </div>
                <h3 className="my-5 text-lg font-semibold">Tạo Challenge</h3>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    form={form}
                >
                    <Form.Item
                        label={<span>Tiêu đề</span>}
                        name="title"
                        className=" pr-5"
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Không được bỏ trống' }]}
                    >
                        <Input placeholder="Nhập tiêu đề" />
                    </Form.Item>
                    <Form.Item
                        label={<span>Độ khó</span>}
                        name="level"
                        className=" pr-5"
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Không được bỏ trống' }]}
                    >
                        <Select
                            // style={{
                            //     width: 120,
                            // }}
                            placeholder="Chọn độ khó"
                            options={[
                                {
                                    value: 'EASY',
                                    label: 'Dễ',
                                },
                                {
                                    value: 'MEDIUM',
                                    label: 'Thường',
                                },
                                {
                                    value: 'HARD',
                                    label: 'Khó',
                                },
                                {
                                    value: 'EXPERT',
                                    label: 'Chuyên gia',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span>Realtime</span>}
                        name="isRealtime"
                        className="form-item-editor pr-5"
                        wrapperCol={{ span: 24 }}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    {isRealtime && (
                        <Form.Item
                            label={<span>Thời gian (phút)</span>}
                            // name="time"
                            className="form-item-editor pr-5"
                            wrapperCol={{ span: 24 }}
                            help={!time ? 'Không được bỏ trống' : false}
                            required
                            validateStatus={!time ? 'error' : undefined}
                        >
                            <InputNumber
                                min={15}
                                className="w-full"
                                defaultValue={15}
                                value={time}
                                onChange={onChangeTime}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        label={<span>Mô tả</span>}
                        name="describe"
                        className="form-item-editor pr-5"
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Không được bỏ trống' }]}
                    >
                        <ReactQuill
                            theme="snow"
                            className="h-full"
                            value={value}
                            onChange={setValue}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span>Nội dung</span>}
                        className="form-item-editor pr-5"
                        wrapperCol={{ span: 24 }}
                        name="content"
                        rules={[{ required: true, message: 'Không được bỏ trống' }]}
                    >
                        <Editor
                            theme={'light'}
                            language={'javascript'}
                            className="code-editor h-[500px] w-full border"
                            saveViewState={false}
                            // onChange={(value: any) => handleChangeEditor(value ?? '')}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span>Tên hàm</span>}
                        className="form-item-editor pr-5"
                        wrapperCol={{ span: 24 }}
                        name="functionName"
                        rules={[{ required: true, message: 'Không được bỏ trống' }]}
                    >
                        <Input placeholder="Nhập vào tên hàm" />
                    </Form.Item>
                    <Form.Item
                        className="mb-3 pr-5"
                        wrapperCol={{ span: 18, offset: 4 }}
                        // rules={[{ required: true, message: 'Không được bỏ trống' }]}
                    >
                        <div>
                            <span className="text-red-500">*</span>{' '}
                            <span>
                                Lưu ý: Tham số của hàm, nếu có từ 2 tham số trở lên mỗi tham số cách nhau bởi dấu ",".
                                VD: [3, 5],[41, 9]
                            </span>
                        </div>
                    </Form.Item>

                    <Form.List
                        name="testCase"
                        initialValue={[{ input: '', output: '' }]}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <div
                                        key={key}
                                        className="mb-2 flex w-full items-baseline gap-2"
                                    >
                                        <Form.Item
                                            {...restField}
                                            label={<span>Đầu vào</span>}
                                            labelCol={{ span: 6 }}
                                            wrapperCol={{ span: 18, offset: 2 }}
                                            name={[name, 'input']}
                                            className="grow"
                                            rules={[{ required: true, message: 'Nhập đầu vào' }]}
                                        >
                                            <Input.TextArea
                                                rows={3}
                                                placeholder="Đầu vào"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            labelCol={{ span: 6 }}
                                            wrapperCol={{ span: 18, offset: 2 }}
                                            label={<span>Đầu ra</span>}
                                            name={[name, 'output']}
                                            className="grow"
                                            rules={[{ required: true, message: 'Nhập đầu ra' }]}
                                        >
                                            <Input.TextArea
                                                rows={3}
                                                placeholder="Đầu ra"
                                            />
                                        </Form.Item>

                                        {index !== 0 ? (
                                            <DeleteOutlined
                                                onClick={() => remove(name)}
                                                className=" text-red-600 hover:text-red-400"
                                            />
                                        ) : (
                                            <div className="h-3 w-3"></div>
                                        )}
                                    </div>
                                ))}

                                <div className="flex ">
                                    <Button
                                        onClick={() => add()}
                                        block
                                        type="primary"
                                        loading={loading}
                                        icon={<PlusOutlined />}
                                        className="ml-auto w-min text-primary"
                                    >
                                        Thêm test case
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </div>
    )
}

export default ChallengeCreate
