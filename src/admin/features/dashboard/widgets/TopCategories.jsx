import React, { memo } from 'react';
import { Card, Col, Row, List, Progress, Typography, Space } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { __ } from '@wordpress/i18n';

const { Text } = Typography;

const colorHighlight = window.bulkcatmanData.adminColors.highlight;

const mockCategories = [
    { name: 'Coffee Makers', count: 1320 },
    { name: 'Espresso Machines', count: 958 },
    { name: 'Coffee Beans', count: 875 },
    { name: 'Mugs', count: 642 },
    { name: 'Accessories', count: 580 },
];

const maxCount = Math.max(...mockCategories.map(c => c.count));

const TopCategories = memo(() => {
    const dispatch = useDispatch();

    return (
        <Card title={__('Top Categories', 'bulk-category-manager')}>
            <Row>
                <Col span={24}>
                    <List
                        dataSource={mockCategories}
                        renderItem={(category) => {
                            const percent = Math.round((category.count / maxCount) * 100);

                            return (
                                <List.Item>
                                    <Row style={{ width: '100%' }} align="middle">
                                        
                                        {/* Category Name */}
                                        <Col span={8}>
                                            <Space>
                                                <AppstoreOutlined style={{ color: colorHighlight }} />
                                                <Text>{category.name}</Text>
                                            </Space>
                                        </Col>

                                        {/* Progress Bar */}
                                        <Col span={10}>
                                            <Progress
                                                percent={percent}
                                                showInfo={false}
                                                strokeColor={colorHighlight}
                                            />
                                        </Col>

                                        {/* Product Count */}
                                        <Col span={6} style={{ textAlign: 'right' }}>
                                            <Text strong>{category.count}</Text>
                                        </Col>

                                    </Row>
                                </List.Item>
                            );
                        }}
                    />
                </Col>
            </Row>
        </Card>
    );
});

export default TopCategories;