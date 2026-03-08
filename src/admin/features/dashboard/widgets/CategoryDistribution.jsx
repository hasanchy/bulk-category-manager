import React, { memo } from 'react';
import { Card, Col, Row } from 'antd';
import { Pie } from '@ant-design/plots';
import { __ } from '@wordpress/i18n';

const mockData = [
    { type: 'Coffee Makers', value: 1320 },
    { type: 'Espresso Machines', value: 958 },
    { type: 'Coffee Beans', value: 875 },
    { type: 'Mugs', value: 642 },
    { type: 'Accessories', value: 580 },
];

const CategoryDistribution = memo(() => {
    const config = {
    data: mockData,
    angleField: 'value',
    colorField: 'type',
    legend: false,
    innerRadius: 0.1,
    labels: [
      { text: 'type', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        style: {
          fontSize: 9,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: ['#1890ff', '#91d5ff', '#0050b3'],
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

    return (
        <Card title={__('Category Distribution', 'bulk-category-manager')}>
            <Row>
                <Col span={24}>
                    <Pie {...config} />
                </Col>
            </Row>
        </Card>
    );
});

export default CategoryDistribution;