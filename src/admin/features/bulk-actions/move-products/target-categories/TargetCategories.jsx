import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Card, Col, Flex, Form, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MoveProductsSteps from '../move-products-steps/MoveProductsSteps';
import CategoriesCheckbox from '../../../../components/categories/CategoriesCheckbox';
import { setMoveProductsStepIndex, setTargetCategoryIds } from '../moveProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

const TargetCategories = () => {

    const { targetCategoryIds } = useSelector((state) => state.moveProducts);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    form.setFieldsValue({
        targetCategoryIds
    });

    const handleBack = () => {
        dispatch( setMoveProductsStepIndex(2) );
    }

    const handleNext = () => {
        dispatch( setMoveProductsStepIndex(4) );
    }

    const handleCategoriesChange = (value) => {
        form.setFieldsValue({ 
            targetCategoryIds: value
        });
        dispatch(setTargetCategoryIds(value));
    }

    const renderFooterLeft = () => {
        return <Flex justify='flex-start'>
            <Button
                icon={<LeftOutlined />}
                iconPlacement="start"
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
                iconPlacement="end"
                type="primary" 
                disabled={targetCategoryIds.length === 0}
                onClick={handleNext}
            >
                { __( 'Next', 'bulk-category-manager' ) }
            </Button>
        </Flex>
    }

    return (
        <React.Fragment>
            <Card>
                <MoveProductsSteps />
            </Card>
            <Card
                style={{
                    marginTop: '10px'
                }}
            >
                <Space 
                    orientation="vertical" 
                    size="middle" 
                    style={{ display: 'flex' }}
                >
                    <Form
                        name="targetCategory"
                        form={form}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={__('Categories', 'bulk-category-manager')}
                            name="targetCategoryIds"
                            rules={[
                                {
                                    required: true,
                                    message: __('Please select at least one category', 'bulk-category-manager'),
                                }
                            ]}
                        >
                            <CategoriesCheckbox 
                                disabled={false} 
                                onChange={handleCategoriesChange} 
                                displayError={false}
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

export default TargetCategories;