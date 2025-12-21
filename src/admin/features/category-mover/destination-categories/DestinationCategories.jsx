import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Card, Col, Flex, Form, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import CategoryMoverSteps from '../category-mover-steps/CategoryMoverSteps';
import CategoriesCheckbox from '../../../components/categories/CategoriesCheckbox';
import { setCategoryMoverStepIndex, setDestinationCategoryIds } from '../categoryMoverSlice';
import { useDispatch, useSelector } from 'react-redux';

const DestinationCategories = () => {

    const { destinationCategoryIds } = useSelector((state) => state.categoryMover);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    form.setFieldsValue({
        destinationCategoryIds
    });

    const handleBack = () => {
        dispatch( setCategoryMoverStepIndex(1) );
    }

    const handleNext = () => {
        dispatch( setCategoryMoverStepIndex(3) );
    }

    const handleCategoriesChange = (value) => {
        form.setFieldsValue({ 
            destinationCategoryIds: value
        });
        dispatch(setDestinationCategoryIds(value));
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
                { __( 'Back', 'bulk-product-category-mover-for-woocommerce' ) }
            </Button>
        </Flex>
    }

    const renderFooterRight = () => {
        return <Flex justify='flex-end'>
            <Button
                icon={<RightOutlined />}
                iconPosition="end"
                type="primary" 
                disabled={destinationCategoryIds.length === 0}
                onClick={handleNext}
            >
                { __( 'Next', 'bulk-product-category-mover-for-woocommerce' ) }
            </Button>
        </Flex>
    }

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
                        name="destinationCategory"
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
                            label={__('Categories', 'bulk-product-category-mover-for-woocommerce')}
                            name="destinationCategoryIds"
                            rules={[
                                {
                                    required: true,
                                    message: __('Please select at least one category', 'bulk-product-category-mover-for-woocommerce'),
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
                <div className='bulkprodmov-product-search-footer'>
                    <div className='bulkprodmov-product-search-footer-left'>
                        {renderFooterLeft()}
                    </div>
                    <div className='bulkprodmov-product-search-footer-center'>
                        {/* {renderFooterCenter()} */}
                    </div>
                    <div className='bulkprodmov-product-search-footer-right'>
                        {renderFooterRight()}
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}

export default DestinationCategories;