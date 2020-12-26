import React from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';
import axios from 'axios';
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { BASE_URL } from '../consts';

// const { Option } = Select;

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
        title: 'Tên store',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
    },
];

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], visible: false, visible1: false };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        let config = {headers:{Auth: this.props.token}}
        axios.get(`${BASE_URL}/v1/user/store`,config)
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
        let config = { headers: { Auth: this.props.token } }
        values.type = '1';
        console.log('POST')
        console.log(values)
        axios.post(`${BASE_URL}/v1/user/crestore`, values, config)
            .then(() => {
                this.setState({ visible: false }, () => {
                    axios.get(`${BASE_URL}/v1/user/store`, config)
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
        values.type = '1';
        let config = { headers: { Auth: this.props.token } }
        axios.put(`${BASE_URL}/v1/user/activestore`, values, config)
            .then((response) => {
                this.setState({ visible: false }, () => {
                    if (response.data.error.code === 200) {
                        axios.get(`${BASE_URL}/v1/user/store`, config)
                        .then(
                            (response) => {
                                this.setState({ data: response.data.data }, () => console.log(this.state.data))
                                console.log(response)
                            }
                        )
                        .catch(console.log)
                    }
                    else {
                        alert('Kích hoạt tài khoản khách hàng không thành công');
                    }
                })
            })
            .catch(console.log)
    }

    onFinish2 = (values) => {
        console.log(values);
        values.type = '1';
        let config = { headers: { Auth: this.props.token } }
        axios.put(`${BASE_URL}/v1/user/deactivestore`, values, config)
            .then((response) => {
                this.setState({ visible: false }, () => {
                    if (response.data.error.code === 200) {
                        axios.get(`${BASE_URL}/v1/user/store`, config)
                        .then(
                            (response) => {
                                this.setState({ data: response.data.data }, () => console.log(this.state.data))
                                console.log(response)
                            }
                        )
                        .catch(console.log)
                    }
                    else {
                        alert('Vô hiệu hoá tài khoản khách hàng không thành công');
                    }
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
                                <Button htmlType="submit"> Kích hoạt</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish2}
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
                            name="name"
                            label='name'
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label='type'
                            value='1'
                        >
                            store
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
    return{
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(withRouter(Store));