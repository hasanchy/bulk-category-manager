import React, {memo} from 'react';
import { Card, Col, Row, Statistic  } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { __ } from '@wordpress/i18n';
// import { setActiveTab } from '../../../app/manuSlice';

const colorHighlight = window.bulkcatmanData.adminColors.highlight;

const TotalCategories = memo(() => {
    // const dispatch = useDispatch();
    // const { totalImportedProducts, isDashboardStatLoading } = useSelector((state) => state.dashboard);

    const handleOnClick = () => {
        // dispatch(setActiveTab( 'products' ));
    }

    return (
        <Card>
            <Row>
                <Col span={18}>
                    <Statistic title={__('Total Categories', 'bulk-category-manager')} loading={false} value={10}/>
                </Col>
                <Col span={6}>
                    <div className='bulkcatman-icon-box' style={{cursor:'pointer', background:colorHighlight}} onClick={handleOnClick}>
                        <AppstoreOutlined style={{fontSize:'25px'}}/>
                    </div>
                </Col>
            </Row>
        </Card>
	)
})

export default TotalCategories;