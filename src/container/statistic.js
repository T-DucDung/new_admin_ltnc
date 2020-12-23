import React from 'react';

import { Collapse, DatePicker } from 'antd';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

class Statistic extends React.Component {
    render() {
        return (
            <div className="satistic" style={{marginTop:20}}>
                <RangePicker style={{marginBottom:20}}></RangePicker>
                <div><h1>Tổng doanh thu:</h1></div>
                <div><h1>Số lượng shop:</h1></div>
                <div><h1>Sô lượng khách hàng:</h1></div>
                <div><h1>Số lượng shipper:</h1></div>
                <div><h1>Thống kê shop</h1></div>
                <Collapse style={{marginTop:20}} >
                    <Panel header="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>{text}</p>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}
export default Statistic;