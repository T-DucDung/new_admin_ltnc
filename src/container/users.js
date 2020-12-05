import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button } from 'antd';

import axios from 'axios';
import { BASE_URL } from '../consts';

const { Column } = Table;



class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], visible: false };
        this.formRef = React.createRef();

    }
    componentDidMount() {
        axios.get(`${BASE_URL}/foods/view`)
            .then(
                (respone) => { this.setState({ data: respone.data }) }
            )
            .catch(console.log)
        this.setState({ visible: true })
        this.setState({ visible: false })
    }

    showModal(record) {
        this.setState({ visible: true }, () => this.formRef.current.setFieldsValue(record))
        
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
                    <Column title="Ảnh" dataIndex="anh" key="anh" render={(anh) => (<Image width={150} height={150} src={anh} />)} />
                    <Column title="Tên món ăn" dataIndex="tenmon" key="tenmon" />
                    <Column title="Giá" dataIndex="gia" key="gia" />
                    <Column title="Trạng thái" dataIndex="trangthai" key="trangthai" />
                    <Column
                        title="Action"
                        key="action"
                        render={(record) => (
                            <Space size="middle">
                                <div onClick={() => { this.showModal(record) }}>Edit</div>
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
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        initialValues={{}}
                    >
                        <Form.Item
                            name="anh"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="tenmon"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="gia"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="tentrangthai"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Sửa</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Users;