import React from 'react';
import axios from 'axios';
import { Collapse, DatePicker, List, Avatar } from 'antd';
import { connect } from 'react-redux';

import { STAT_URL } from '../consts';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;


const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;



class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                revenue: "string",
                statistic_all_store: [
                    {
                        best_selling_foods: [
                            {
                                food_id: "string",
                                food_name: "string",
                                total_count: "string"
                            }
                        ],
                        id: "string",
                        loyal_customers_name: [
                            {
                                customers_id: "string",
                                customers_name: "string",
                                total_count: "string"
                            }
                        ],
                        name: "string",
                        number_of_orders: "string",
                        rate_avg: "string",
                        revenue: "string"
                    }
                ],
                total_customer: "string",
                total_order: "string",
                total_shipper: "string",
                total_shop: "string"
            }
        }

    }

    componentDidMount() {
        let config = { headers: { auth: this.props.token } }

        axios.get(`${STAT_URL}/v1/statistic/`, config)
            .then((response) => {
                if (response.data.error.code === 200) {
                    this.setState({ data: response.data.data }, () => { console.log(this.state.data) })
                }
                else {
                    window.localStorage.removeItem('token')
                }
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="satistic" style={{ marginTop: 20 }}>
                <RangePicker style={{ marginBottom: 20 }}></RangePicker>
                <div><h1>Tổng doanh thu:{this.state.data.revenue}</h1></div>
                <div><h1>Số lượng shop:{this.state.data.total_shop}</h1></div>
                <div><h1>Sô lượng khách hàng:{this.state.data.total_customer}</h1></div>
                <div><h1>Số lượng shipper:{this.state.data.total_shipper}</h1></div>
                <div><h1>Thống kê shop</h1></div>
                <Collapse accordion style={{ marginTop: 20 }} >
                    {this.state.data.statistic_all_store.map((item, index) => (
                        <Panel header={`${item.name}`} key={index}>
                            <div>

                                <div>
                                    Đánh giá: {item.rate_avg}/5
                </div>
                                <div>
                                    Khách hàng thân thiết:
                </div>

                                <div className="kh" style={{ marginTop: 10 }}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={item.loyal_customers_name}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a href="https://ant.design">{item.customers_name}</a>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    Món ăn bán chạy nhất:
                                </div>
                                <div className="ma" style={{ marginTop: 10 }}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={item.best_selling_foods}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={<a href="https://ant.design">{item.food_name}</a>}
                                                    description={item.total_count}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(Statistic);