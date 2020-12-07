import React from 'react';
import { Table, Space, Tag, Modal, Form, Input, Button } from 'antd';

import { BASE_URL } from '../consts';

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
      render: roles =>( 
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
        this.state = { data: [], visible: false };
        this.formRef = React.createRef();

    }
    componentDidMount() {
        window.axios.get(`${BASE_URL}/users`)
            .then(
                (response) =>  
                {this.setState({ data: response.data },() => console.log(this.state.data)) }
            )
            .catch(console.log)
    }



    showModal(record) {
        this.setState({ visible: true }, 
            () =>{
                window.axios.get(`${BASE_URL}/foods/view`)
            .then(
                (respone) => { this.setState({ data: respone.data }) }
            )
            .catch(console.log) 
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
                <Table columns={columns} dataSource={this.state.data}>
                    
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

export default Account;