import React from 'react';
import axios from 'axios';
import { Table, Tag, Modal, Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { BASE_URL } from '../consts';

// const { Option } = Select;
//  fullname imageurl address, mobile email username pass type
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
        title: 'Tên',
        dataIndex: 'full_name',
        key: 'full_name',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image_url',
        key: 'image_url',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
    },
];

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], visible: false, visible1: false };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        let config = { headers: { Auth: this.props.token } }
        console.log(config)
        axios.get(`${BASE_URL}/v1/user/customer`, config)
            .then(
                (response) => {
                    this.setState({ data: response.data.data }, () => console.log(this.state.data))
                    console.log(response)
                }
            )
            .catch(console.log)
    }


    onFinish = (values) => {
        console.log(values);
        values.type = '3';
        let config = { headers: { Auth: this.props.token } }
        console.log('POST')
        console.log(values)
        axios.post(`${BASE_URL}/v1/user/creuser`, values, config)
            .then(() => {
                this.setState({ visible: false }, () => {
                    axios.get(`${BASE_URL}/v1/user/customer`, config)
                        .then(
                            (response) => {
                                this.setState({ data: response.data.data }, () => console.log(this.state.data))
                                console.log(response)
                            }
                        )
                        .catch(console.log)
                })
            })
            .catch(console.log)
    }

    onFinish1 = (values) => {
        console.log(values);

        window.axios.put(`${BASE_URL}/user/${values.id}`,)
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish1}
                            initialValues={{}}
                            style={{ display: "flex" }}
                        >
                            <Form.Item
                                name="id"
                                label='Id'
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit"> Vô hiệu hoá</Button>
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
                        <Form.Item name="username" label='username' >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item name="password" label="password" >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item name="email" label="email" >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item name="address" label="address" >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item name="full_name" label='full_name'>
                            <Input></Input>
                        </Form.Item>
                        
                        <Form.Item name="image_url" label='image_url'>
                            <Input></Input>
                        </Form.Item>
                        
                        <Form.Item name="mobile" label='mobile'>
                            <Input></Input>
                        </Form.Item>
                        
                        <Form.Item name='type' label='type'
                            value='3'
                        >
                            customer
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

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(withRouter(Account));