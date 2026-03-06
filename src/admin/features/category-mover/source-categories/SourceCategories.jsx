import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Card, Col, Flex, Form, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import CategoryMoverSteps from '../category-mover-steps/CategoryMoverSteps';
import CategoriesCheckbox from '../../../components/categories/CategoriesCheckbox';
import { setCategoryMoverStepIndex, setSourceCategoryIds } from '../categoryMoverSlice';
import { useDispatch, useSelector } from 'react-redux';

const SourceCategories = () => {

    const { sourceCategoryIds } = useSelector((state) => state.categoryMover);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    form.setFieldsValue({
        sourceCategoryIds
    });

    const handleNext = () => {
        dispatch( setCategoryMoverStepIndex(2) );
    }

    const handleCategoriesChange = (value) => {
        form.setFieldsValue({ 
            sourceCategoryIds: value
        });
        dispatch(setSourceCategoryIds(value));
    }

    const renderFooterRight = () => {
        return <Flex justify='flex-end'>
            <Button
                icon={<RightOutlined />}
                iconPosition="end"
                type="primary" 
                disabled={sourceCategoryIds.length === 0}
                onClick={handleNext}
            >
                { __( 'Next', 'bulk-category-manager' ) }
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
                        name="sourceCategory"
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
                            name="sourceCategoryIds"
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
                        {/* {renderFooterLeft()} */}
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

export default SourceCategories;