import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import { BASE_URL, IMAGE_URL } from '../consts';

const { Column } = Table;
const { Option } = Select;

class Foods extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], type: [], visible: false, };
        this.formRef = React.createRef();

    }

    uploadProps = {
        name: 'file',
        action: 'http://192.168.0.109:8081/uploadFile',
        onChange: (info) => {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
    };


    componentDidMount() {
        // window.axios.get(`${BASE_URL}/foods`)
        //     .then(
        //         (respone) => { this.setState({ data: respone.data }) }
        //     )
        //     .catch(console.log)
        // window.axios.get(`${BASE_URL}/types`)
        //     .then(
        //         (respone) => { this.setState({ type: respone.data }) }
        //     )
        //     .catch(console.log)
    }



    showModal(record) {
        this.setState({ visible: true },
            () => {
                this.formRef.current.setFieldsValue(record)
            })
    };

    onFinish = (values) => {
        console.log(values);
        if (values.picker === undefined || values.picker.fileList.length === 0) {
            delete values["picker"];
        }
        else {
            values.anh = values.picker.file.response;
            delete values["picker"];
        }
        if (!!values.mamon) {
            console.log('PUT')
            console.log(values)
            window.axios.put(`${BASE_URL}/foods/${values.mamon}`, values)
                .then(() => {
                    this.setState({ visible: false }, () => {
                        window.axios.get(`${BASE_URL}/foods`)
                                        .then(
                                            (respone) => { this.setState({ data: respone.data }) }
                                        )
                                        .catch(console.log)
                    })
                })
                .catch(console.log)
        }
        else {
            console.log('POST')
            console.log(values)
            window.axios.post(`${BASE_URL}/foods`, values)
                .then(() => {
                    this.setState({ visible: false }, () => {
                        window.axios.get(`${BASE_URL}/foods`)
                                        .then(
                                            (respone) => { this.setState({ data: respone.data }) }
                                        )
                                        .catch(console.log)
                    })
                })
                .catch(console.log)
        }
        
    }

    handleCancel = () => {
        this.setState({ visible: false }, () => this.formRef.current.resetFields())
    };


    render() {
        return (
            <>
                <Button
                    style={{
                        float: 'right',
                        margin: '0px 20px 15px 0px'
                    }}
                    onClick={() => { this.showModal({})}}>
                    Thêm mới
                </Button>
                <Table dataSource={this.state.data}>
                    <Column title="Mã" dataIndex="mamon" key="id" />
                    <Column title="Ảnh" dataIndex="anh" key="anh" render={(anh) => (<Image width={150} height={150} src={IMAGE_URL + '/' + anh} />)} />
                    <Column title="Tên món ăn" dataIndex="tenmon" key="tenmon" />
                    <Column title="Giá" dataIndex="gia" key="gia" />
                    <Column title="Trạng thái" dataIndex="trangthai" key="trangthai" />
                    <Column
                        title="Action"
                        key="action"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => { this.showModal(record) }}>Edit</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    footer={false}
                    onCancel={this.handleCancel}
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        initialValues={{}}
                    >
                        <Form.Item
                            label="Mã món"
                            name="mamon"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item
                            label="Ảnh"
                            name="anh"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item
                            label="Chọn ảnh"
                            name="picker"
                        >
                            <Upload {...this.uploadProps}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Tên món"
                            name="tenmon"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="gia"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="mota"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Đơn vị tính"
                            name="dvt"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="trangthai"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Loại"
                            name="maloai"
                        >
                            <Select>
                                {
                                    this.state.type.map((index) => {
                                        return <Option value={index.maloai}>{index.tenloai}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                            <Button htmlType="submit">Sửa</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Foods;