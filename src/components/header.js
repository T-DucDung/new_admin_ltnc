import React from 'react';
import { Tabs, Button } from 'antd';
import {Redirect} from 'react-router-dom'
import Users from '../container/users';

const { TabPane } = Tabs;

const operations = <Button>Log Out</Button>;

class Header extends React.Component {

    render() {
        return (
            <div style={{ paddingBottom: 30 }}>
                <Tabs tabBarExtraContent={operations}>
                    {
                        this.props.role === 'ROLE_ADMIN'
                            ?
                            <>
                                <TabPane tab="Quản lý đồ ăn" key="1">
                                    <Users></Users>
                                </TabPane>
                                <TabPane tab="Quản lý tài khoản" key="2">
                                    Content of tab 2
                            </TabPane>
                            </>
                            :
                            this.props.role === 'ROLE_MOD'
                                ?
                                <TabPane tab="Quản lý đồ ăn" key="1">
                                    <Users></Users>
                                </TabPane> 
                                : 
                                <Redirect to="/login"/>
                    }

                </Tabs>
            </div>
        );
    }
}

export default Header