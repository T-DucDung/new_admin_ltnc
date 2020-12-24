import React from 'react';
import { Tabs, Button } from 'antd';
import Account from '../container/account';
import Shipper from '../container/shipper';
import Store from '../container/store';
import { BrowserRouter as Router, Redirect, withRouter } from "react-router-dom";

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
            <Router>
                <div style={{ paddingBottom: 30 }}>
                <Tabs tabBarExtraContent={<Button type="button" onClick={this.logOut}>Log Out</Button>}>
                    {/* { */}
                        // this.props.role.includes('ROLE_ADMIN')
                        //     ?
                            // <>
                                <TabPane tab="Quản lý tài khoản người mua" key="2">
                                    <Account></Account>
                                </TabPane>
                                <TabPane tab="Quản lý tài khoản người bán" key="3">
                                    <Store></Store>
                                </TabPane>
                                <TabPane tab="Quản lý tài khoản người giao hàng" key="4">
                                    <Shipper></Shipper>
                                </TabPane>
                            // </>
                            // :
                            // this.props.role.includes('ROLE_MOD')
                            //     ?
                                // :
                                // this.props.history.push("/login")
                    {/* } */}
                </Tabs>
            </div>
            </Router>
        );
    }
}

export default withRouter(Header)