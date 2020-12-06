import './App.css';
import React from 'react';
import Header from './components/header';
import { Layout } from 'antd';

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <>
        <Layout style={{margin:'0px auto', width:'80%' , maxWidth:'1140px'}}>
          <Content style={{ background: "white" }}>
            <H role="ROLE_ADMIN" history={this.props.history}>
            </H>
          </Content>
        </Layout>
      </>
    )
  };
}

export default App;
