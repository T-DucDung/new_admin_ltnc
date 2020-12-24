import React from 'react';
import axios from 'axios';
import { Collapse, DatePicker } from 'antd';

import {STAT_URL} from '../consts';

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
        let config = { headers: { auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MDg3NTY5MzUsInR5cGUiOiIwIiwidHlwZV9pZCI6IjIifQ.F2_5NOYGF9XjioQRA_eVlPy0R-RwFCa-FnTPnk5lri8' } }

        axios.get(`${STAT_URL}/v1/statistic/`, config)
            .then((response) => {
                if (response.data.error.code === 200) {
                    this.setState({ data: response.data.data })
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
                <Collapse style={{ marginTop: 20 }} >
                    {this.state.data.statistic_all_store.map((item, index) => (
                        <Panel header={`This is panel header ${item}`} key={index}>
                            <p>{text}</p>
                        </Panel>
                    ))}

                </Collapse>
            </div>
        );
    }
}
export default Statistic;