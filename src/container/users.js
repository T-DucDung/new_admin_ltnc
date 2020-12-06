import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button, Select } from 'antd';

import axios from 'axios';
import { BASE_URL } from '../consts';

const { Column } = Table;
const { Option } = Select;


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], type: [], visible: false };
        this.formRef = React.createRef();

    }
    componentDidMount() {
        axios.get(`${BASE_URL}/foods`)
            .then(
                (respone) => { this.setState({ data: respone.data }) }
            )
            .catch(console.log)
        axios.get(`${BASE_URL}/types`)
            .then(
                (respone) => { this.setState({ type: respone.data }) }
            )
            .catch(console.log)
    }



    showModal(record) {
        this.setState({ visible: true },
            () => {
                this.formRef.current.setFieldsValue(record)
            })

    };

    onFinish = (values) => {
        console.log(values);
    }

    handleCancel = () => {
        this.setState({ visible: false }, () => this.formRef.current.resetFields())
    };


    render() {
        return (
            <>
                <Table dataSource={this.state.data}>
                    <Column title="Mã" dataIndex="mamon" key="id" />
                    <Column title="Ảnh" dataIndex="anh" key="anh" render={(anh) => (<Image width={150} height={150} src={anh} />)} />
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
                            label="Ảnh"
                            name="anh"
                        >
                            <Input></Input>
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
                            label="Trạng thái"
                            name="tentrangthai"
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

export default Users;