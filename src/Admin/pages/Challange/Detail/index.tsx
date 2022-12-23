import { Button, Checkbox, Form, Input, notification, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import Editor from '@monaco-editor/react'

interface IData {
    isRealtime: boolean
    time: number
}

interface IChallengeDetailProps {}

const ChallengeDetail: React.FC<IChallengeDetailProps> = props => {
    const [form] = Form.useForm()
    const [value, setValue] = useState('')
    const [data, setData] = useState<IData>({} as IData)
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    let { id } = useParams()

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
        if (Object.keys(data).length !== 0) {
            form.setFieldsValue({ ...data, time: data.time / 1000 / 60 })
        }
    }, [data, form])

    const handleCreate = () => {
        form.validateFields().then((values: any) => {
            setLoading(true)
            ChallengeApi.update(id!, { ...values, time: parseInt(values.time) * 1000 * 60 })
                .then(res => {
                    notification.success({ message: 'Chỉnh sửa thành công' })
                    navigate('/admin/challenge')
                })
                .catch(err => {
                    notification.error({ message: 'Chỉnh sửa thất bại' })
                })
                .finally(() => setLoading(false))
        })
    }

    return (
        <Spin spinning={loadingPage}>
            <div className="flex h-full w-full justify-center p-4">
                <div className="w-3/4 rounded-md bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to={'/admin/challenge'}
                            className="flex w-fit items-center"
                        >
                            <ArrowLeftOutlined className="mr-2" />
                            Trở về Danh Sách Challenge
                        </Link>

                        <Button
                            type="primary"
                            className="rounded bg-primary font-medium"
                            loading={loading}
                            onClick={handleCreate}
                        >
                            <PlusOutlined className="anticon-custom" /> Chỉnh sửa
                        </Button>
                    </div>
                    <h3 className="my-5 text-lg font-semibold">Tạo Challenge</h3>
                    <Form
                        name="basic"
                        labelCol={{ span: 3 }}
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
                            <Checkbox />
                        </Form.Item>
                        {data.isRealtime && (
                            <Form.Item
                                label={<span>Thời gian (phút)</span>}
                                name="time"
                                className="form-item-editor pr-5"
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Không được bỏ trống' }]}
                            >
                                <Input />
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
                            wrapperCol={{ span: 18, offset: 3 }}
                            rules={[{ required: true, message: 'Không được bỏ trống' }]}
                        >
                            <div>
                                <span className="text-red-500">*</span>{' '}
                                <span>Lưu ý: Nếu hàm có nhiều tham số các tham số sẽ cách nhau bằng dấu ","</span>
                            </div>
                        </Form.Item>
                        <Form.List
                            name="testCase"
                            initialValue={[{ input: '', output: '' }]}
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div
                                            key={key}
                                            className="mb-2 flex w-full items-baseline gap-2"
                                        >
                                            <Form.Item
                                                {...restField}
                                                label={<span>Đầu vào</span>}
                                                labelCol={{ span: 4 }}
                                                wrapperCol={{ span: 18, offset: 2 }}
                                                name={[name, 'input']}
                                                className="grow"
                                                // rules={[{ required: true, message: 'Nhập đầu vào' }]}
                                            >
                                                <Input.TextArea
                                                    rows={3}
                                                    placeholder="Đầu vào"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                labelCol={{ span: 4 }}
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
                                            <MinusCircleOutlined onClick={() => remove(name)} />
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
        </Spin>
    )
}

export default ChallengeDetail
