import React, { memo } from 'react';
import { Card, List, Typography, Space, Row, Col } from 'antd';
import { SwapRightOutlined, CopyOutlined, MergeCellsOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

const { Text } = Typography;
const colorHighlight = window.bulkcatmanData.adminColors.highlight;

const mockOperations = [
    {
        type: 'move',
        count: 1020,
        from: 'Coffee Makers',
        to: 'Espresso Machines',
        date: 'Today 14:30',
    },
    {
        type: 'copy',
        count: 540,
        from: 'Accessories',
        to: 'Sale',
        date: 'Yesterday 11:10',
    },
    {
        type: 'merge',
        count: 300,
        from: 'Coffee Beans & Premium Coffee Beans',
        to: 'Coffee Beans',
        date: 'Yesterday 09:45',
    },
];

const RecentOperations = memo(() => {

    const getIcon = (type) => {
        switch (type) {
            case 'move': return <SwapRightOutlined style={{ color: colorHighlight }} />;
            case 'copy': return <CopyOutlined style={{ color: colorHighlight }} />;
            case 'merge': return <MergeCellsOutlined style={{ color: colorHighlight }} />;
            default: return null;
        }
    };

    const getLabel = (type) => {
        switch (type) {
            case 'move': return 'Moved';
            case 'copy': return 'Copied';
            case 'merge': return 'Merged';
            default: return '';
        }
    };

    return (
        <Card title={__('Recent Operations', 'bulk-category-manager')}>
            <List
                dataSource={mockOperations}
                renderItem={(operation, index) => (
                    <List.Item key={index}>
                        <Row style={{ width: '100%' }} align="middle">
                            {/* Left: Icon + Operation */}
                            <Col flex="1">
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Space>
                                        {getIcon(operation.type)}
                                        <Text strong>{`${getLabel(operation.type)} ${operation.count} products`}</Text>
                                    </Space>
                                    <Text type="secondary">{`${operation.from} → ${operation.to}`}</Text>
                                </Space>
                            </Col>

                            {/* Right: Operation time */}
                            <Col>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    {operation.date}
                                </Text>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </Card>
    );
});

export default RecentOperations;