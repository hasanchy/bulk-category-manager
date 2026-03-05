import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Card, Col, Flex, Form, Radio, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import CategoryMoverSteps from '../category-mover-steps/CategoryMoverSteps';
import { setActionMode, setCategoryMoverStepIndex } from '../categoryMoverSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdditionalOptions = () => {

    const dispatch = useDispatch();
    const { actionMode } = useSelector((state) => state.categoryMover);
    const [form] = Form.useForm();

    form.setFieldsValue({
        actionMode
    });

    const handleBack = () => {
        dispatch( setCategoryMoverStepIndex(2) );
    }

    const handleNext = () => {
        dispatch( setCategoryMoverStepIndex(4) );
    }

    const renderFooterLeft = () => {
        return <Flex justify='flex-start'>
            <Button
                icon={<LeftOutlined />}
                iconPosition="start"
                type="default" 
                disabled={false}
                onClick={handleBack}
            >
                { __( 'Back', 'bulk-category-manager' ) }
            </Button>
        </Flex>
    }

    const renderFooterRight = () => {
        return <Flex justify='flex-end'>
            <Button
                icon={<RightOutlined />}
                iconPosition="end"
                type="primary" 
                disabled={false}
                onClick={handleNext}
            >
                { __( 'Next', 'bulk-category-manager' ) }
            </Button>
        </Flex>
    }

    const options = [
        {
            label: __( 'Move Products', 'bulk-category-manager' ),
            value: 'move',
        },
        {
            label: __( 'Copy Products', 'bulk-category-manager' ),
            value: 'copy',
        },
    ];

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
                <Space 
                    direction="vertical" 
                    size="middle" 
                    style={{ display: 'flex' }}
                >
                    <Form
                        name="AdditionalOptions"
                        form={form}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 8,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                        disabled={false}
                    >
                        <Form.Item
                            label={ __('Action Mode', 'bulk-category-manager' ) }
                            name="actionMode"
                        >
                            <Radio.Group
                                options={options}
                                defaultValue={actionMode}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={(e) => dispatch(setActionMode(e.target.value))}
                            />
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
            <Card
                size='small'
                style={{
                    position: 'sticky',
                    bottom: '-1px',
                    zIndex: '9999',
                    marginTop: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px -5px 10px 0px'
                }}
            >
                <div className='bulkcatman-product-search-footer'>
                    <div className='bulkcatman-product-search-footer-left'>
                        {renderFooterLeft()}
                    </div>
                    <div className='bulkcatman-product-search-footer-center'>
                        {/* {renderFooterCenter()} */}
                    </div>
                    <div className='bulkcatman-product-search-footer-right'>
                        {renderFooterRight()}
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}

export default AdditionalOptions;