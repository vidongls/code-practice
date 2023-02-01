import { Button, Form, Input, InputNumber, notification, Select, Spin, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'
import Editor from '@monaco-editor/react'
import { setDocumentTitle } from '../../../../helper/helper'
import { useNavigatorStore } from '../../../../store/useNavigatorStore'
const fontSizeArr = [
    '8px',
    '9px',
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '32px',
    '42px',
    '54px',
    '68px',
    '84px',
    '98px',
]
const Size = Quill.import('attributors/style/size')
Size.whitelist = fontSizeArr
Quill.register(Size, true)
const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: Size.whitelist }], // custom dropdown

        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
    ],
}
interface IData {
    isRealtime: boolean
    time: number
}

interface IChallengeEditProps {}

const ChallengeEdit: React.FC<IChallengeEditProps> = props => {
    const { setNavigator } = useNavigatorStore()
    const [form] = Form.useForm()
    const [value, setValue] = useState('')
    const [data, setData] = useState<IData>({} as IData)
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [time, setTime] = useState(15)

    const navigate = useNavigate()
    let { id } = useParams()
    const isRealtime = Form.useWatch('isRealtime', form)

    useEffect(() => {
        setDocumentTitle('Chỉnh sửa bài tập')
        setNavigator({
            title: 'Challenge',
            navigator: [
                {
                    name: 'Bài tập',
                    to: '/admin/challenge',
                },
                {
                    name: 'Chỉnh sửa bài tập',
                },
            ],
        })
    }, [])

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
            form.setFieldsValue({ ...data })
            setTime(data.time / 1000 / 60 || 15)
        }
    }, [data, form])

    const handleCreate = () => {
        form.validateFields().then((values: any) => {
            setLoading(true)
            ChallengeApi.update(id!, { ...values, time: (time || 15) * 1000 * 60 })
                .then(res => {
                    notification.success({ message: 'Chỉnh sửa thành công' })
                    navigate(`/admin/challenge/${id}`)
                })
                .catch(err => {
                    notification.error({ message: 'Chỉnh sửa thất bại' })
                })
                .finally(() => setLoading(false))
        })
    }

    const onChangeTime = (value: any) => {
        setTime(!!value ? parseInt(value) : 15)
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
                            Trở về Danh Sách bài tập
                        </Link>

                        <Button
                            type="primary"
                            className="rounded bg-primary font-medium"
                            loading={loading}
                            onClick={handleCreate}
                        >
                            <EditOutlined className="anticon-custom" /> Chỉnh sửa
                        </Button>
                    </div>
                    <h3 className="my-5 text-lg font-semibold">Chỉnh sửa Challenge</h3>
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
                                modules={modules}
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
                                className="code-editor h-[500px] w-full border py-4"
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
                            rules={[{ required: true, message: 'Không được bỏ trống' }]}
                        >
                            <div>
                                <span className="text-red-500">*</span>{' '}
                                <span>
                                    Lưu ý: Tham số của hàm, nếu có từ 2 tham số trở lên mỗi tham số cách nhau bởi dấu
                                    ",". VD: [3, 5],[41, 9]
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
                                                // rules={[{ required: true, message: 'Nhập đầu vào' }]}
                                            >
                                                <Input.TextArea
                                                    rows={3}
                                                    placeholder="Đầu vào"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                labelCol={{ span: 4, offset: 2 }}
                                                wrapperCol={{ span: 18, offset: 0 }}
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
                                                <MinusCircleOutlined onClick={() => remove(name)} />
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
        </Spin>
    )
}

export default ChallengeEdit
