import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Card, Col, Flex, Row } from 'antd';
import CategoryMoverSteps from './category-mover-steps/CategoryMoverSteps';

const CategoryMover = () => {

    return (
        <React.Fragment>
            <Card>
                <CategoryMoverSteps />
            </Card>
            <Card
                style={{
                    marginTop: '10px'
                }}
            >
                <Row>
                    <Col span={12}> 
                        <Flex justify='flex-start'>
                            Here
                        </Flex>
                    </Col>
                    <Col span={12}> 
                        <Flex justify='flex-end'>
                            
                        </Flex>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    )
}

export default CategoryMover;
