import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { BASE_URL } from '../consts';
import qs from 'qs';

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  login(values) {
    axios.post(`${BASE_URL}/api/auth/signin`, values)
      .then(
        (respone) => {
          console.log(this.props)
          // window.localStorage.setItem('token', `${respone.data.tokenType} ${respone.data.accessToken}`)
          window.localStorage.setItem('roles', `${respone.data.roles}`)
          window.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
              Authorization: `${respone.data.tokenType} ${respone.data.accessToken}`,
            },
            paramsSerializer: function (params) {
              return qs.stringify(params)
            },
          });
          window.dispatch({ type: 'LOGIN', data: true });
          this.props.history.push("/iu");
          console.log(this.props)
        }
      )
      .catch(console.log)
  }

  onFinish = (values) => {
    console.log(values)
    this.login(values);
  }

  render() {
    return (
      <div className="login-container" style={{ textAlign: "center" }}>
        <h1>Login</h1>
        <Form
          {...layout}
          name="basic"
          onFinish={this.onFinish}
          style={{ margin: "auto" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default Login;