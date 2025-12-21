import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
const IntegerStep = ( {value = 10, onChange} ) => {

    const [inputValue, setInputValue] = useState(value);

    const handleOnChange = newValue => {
        setInputValue( newValue );
        onChange( newValue );
    };
    
    return (
        <Row>
            <Col span={12}>
                <Slider
                    min={1}
                    max={100}
                    onChange={handleOnChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={1}
                    max={100}
                    style={{ margin: '0 16px' }}
                    value={inputValue}
                    onChange={handleOnChange}
                />
            </Col>
        </Row>
    );
};
export default IntegerStep;