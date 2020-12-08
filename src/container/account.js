import React from 'react';
import { Table, Tag, Modal, Form, Input, Button, Select } from 'antd';

import { BASE_URL } from '../consts';

const { Option } = Select;

const columns = [
    {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên tài khoản',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Quyền',
        key: 'roles',
        dataIndex: 'roles',
        render: roles => (
            <div>
                {roles.map(role => {
                    return (
                        <Tag color='blue' key={role.id}>
                            {role.name}
                        </Tag>
                    );
                })}
            </div>
        ),
    },
];




class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], visible: false, visible1: false };
        this.formRef = React.createRef();

    }

    componentDidMount() {
        window.axios.get(`${BASE_URL}/users`)
            .then(
                (response) => { this.setState({ data: response.data }, () => console.log(this.state.data)) }
            )
            .catch(console.log)
    }


    onFinish = (values) => {
        console.log(values);

        console.log('POST')
        console.log(values)
        window.axios.post(`${BASE_URL}/api/auth/signup`, values)
            .then(() => {
                this.setState({ visible: false }, () => {
                    window.axios.get(`${BASE_URL}/users`)
                        .then(
                            (respone) => { this.setState({ data: respone.data }) }
                        )
                        .catch(console.log)
                })
            })
            .catch(console.log)
    }

    onFinish1 = (values) => {
        console.log(values);

        window.axios.put(`${BASE_URL}/user/${values}`, )
        .then(() => {
            this.setState({ visible: false }, () => {
                window.axios.get(`${BASE_URL}/users`)
                    .then(
                        (respone) => { this.setState({ data: respone.data }) }
                    )
                    .catch(console.log)
            })
        })
        .catch(console.log)
    }

    handleCancel = () => {
        this.setState({ visible: false }, () => this.formRef.current.resetFields())
    };

    showModal(record) {
        this.setState({ visible: true },
            () => {
                this.formRef.current.setFieldsValue(record)
            })
    };

    showModal1(record) {
        this.setState({ visible1: true },
            () => {
                this.formRef.current.setFieldsValue(record)
            })
    };


    render() {
        return (
            <>
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                    <div>
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish1}
                        initialValues={{}}
                        style={{display:"flex"}}
                    >
                        <Form.Item
                            name="id"
                            label='Id'
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit"> Xóa role</Button>
                        </Form.Item>
                    </Form>
                    </div>
                    <div>
                    <Button
                        style={{
                            margin: '0px 20px 15px 0px'
                        }}
                        onClick={() => { this.showModal({}) }}>
                        Thêm mới
                    </Button>
                    </div>
                </div>
                <Table columns={columns} dataSource={this.state.data}>

                </Table>
                <Modal
                    title="Tạo mới"
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
                            name="username"
                            label='username'
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="password"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label='email'
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label='role'
                        >
                            <Select >
                                <Option value="admin">admin</Option>
                                <Option value="mod">mod</Option>
                                <Option value="user">User</Option>
                            </Select>

                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit"> Tạo mới</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Account;