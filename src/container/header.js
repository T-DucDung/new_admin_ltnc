import React from 'react';
import { Tabs, Button } from 'antd';

import Account from '../container/account';
import Shipper from '../container/shipper';
import Store from '../container/store';
import { BrowserRouter as Router, Redirect, withRouter } from "react-router-dom";
import Statistic from '../container/statistic';


const { TabPane } = Tabs;

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut = () => {
        window.dispatch({ type: 'LOGOUT' });
        this.props.history.push("/login")
    };

    render() {
        return (
                <div style={{ paddingBottom: 30 }}>

                <Tabs tabBarExtraContent={<Button type="button" onClick={this.logOut}>Log Out</Button>}>

                                <TabPane tab="Quản lý tài khoản người mua" key="2">
                                    <Account></Account>
                                </TabPane>
                                <TabPane tab="Quản lý tài khoản người bán" key="3">
                                    <Store></Store>
                                </TabPane>
                                <TabPane tab="Quản lý tài khoản người giao hàng" key="4">
                                    <Shipper></Shipper>
                                </TabPane>
                                <TabPane tab="Thống kê toàn hệ thống" key="5">
                                    <Statistic></Statistic>
                                </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Header)