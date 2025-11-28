import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Card, Col, Divider, Flex, Row, Space, Tag } from 'antd';
import { DoubleRightOutlined, EditOutlined, ExportOutlined, ForwardOutlined, LeftOutlined, RightOutlined, SearchOutlined, SwapRightOutlined, SyncOutlined } from '@ant-design/icons';
import CategoryMoverSteps from '../category-mover-steps/CategoryMoverSteps';
import { setCategoryMoverStepIndex } from '../categoryMoverSlice';
import { useDispatch, useSelector } from 'react-redux';
import { moveProductCategories } from '../../../services/apiService';
import ProgressFooter from '../../../components/progress-footer/ProgressFooter';

const PreviewMove = () => {

    const dispatch = useDispatch();
    const { sourceCategoryIds, destinationCategoryIds, actionMode, isProductCategoriesMoving } = useSelector((state) => state.categoryMover);

    const handleBack = () => {
        dispatch( setCategoryMoverStepIndex(3) );
    }

    const handleProductMove = () => {
        let data = {
            source_categories: sourceCategoryIds.map(category => category.id),
            destination_categories: destinationCategoryIds.map(category => category.id),
            batch_size: 10
        };

        dispatch( moveProductCategories(data) );
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

    const renderFooterCenter = () => {
        return <Flex justify='center'>
            <Button
                icon={<DoubleRightOutlined />}
                iconPosition="end"
                type="primary" 
                loading={isProductCategoriesMoving}
                onClick={handleProductMove}
            >
                { __( 'Move 1020 Products', 'bulk-product-category-mover-for-woocommerce' ) }
            </Button>
        </Flex>
    }

    const renderSourceCategories = () => {
        return <Space wrap>
            {sourceCategoryIds.map((category, index) => (
                <Tag
                    key={`category-${index}`}
                    color={'orange'}
                    style={{
                        marginBottom: '5px',
                        position: 'relative'
                    }}
                >
                    {category.name} <b>({category.count})</b>
                </Tag>
            ))}
        </Space>
    }

    const renderDestinationCategories = () => {
        return <Space wrap>
            {destinationCategoryIds.map((category, index) => (
                <Tag
                    key={`category-${index}`}
                    color={'pink'}
                    style={{
                        marginBottom: '5px',
                        position: 'relative'
                    }}
                >
                    {category.name} <b>({category.count})</b>
                </Tag>
            ))}
        </Space>
    }

    const renderActionMode = () => {

        let actionModeLabel = (actionMode === 'move') ? __( 'Move Products', 'bulk-product-category-mover-for-woocommerce' ) : __( 'Copy Products', 'bulk-product-category-mover-for-woocommerce' );

        return <Tag>
            {actionModeLabel}
        </Tag>
    }

    const handleStopButtonClick = () => {
        
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
                    <Divider orientation="left">
                        <Space>
                            { __('Source Categories', 'bulk-product-category-mover-for-woocommerce' ) } <EditOutlined style={{cursor:'pointer'}} onClick={() => dispatch(setCategoryMoverStepIndex(1))}/>
                        </Space>
                    </Divider>
                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: 'right'}}>{ __('Categories', 'bulk-product-category-mover-for-woocommerce' ) }</Col>
                        <Col span={16}>{renderSourceCategories()}</Col>
                    </Row>
                    <Divider orientation="left">
                        <Space>
                            { __('Destination Categories', 'bulk-product-category-mover-for-woocommerce' ) } <EditOutlined style={{cursor:'pointer'}} onClick={() => dispatch(setCategoryMoverStepIndex(2))}/>
                        </Space>
                    </Divider>
                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: 'right'}}>{ __('Categories', 'bulk-product-category-mover-for-woocommerce' ) }</Col>
                        <Col span={16}>{renderDestinationCategories()}</Col>
                    </Row>
                    <Divider orientation="left">
                        <Space>
                            { __('Additional Options', 'bulk-product-category-mover-for-woocommerce' ) } <EditOutlined style={{cursor:'pointer'}} onClick={() => dispatch(setCategoryMoverStepIndex(3))}/>
                        </Space>
                    </Divider>
                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: 'right'}}>{ __('Action mode', 'bulk-product-category-mover-for-woocommerce' ) }</Col>
                        <Col span={16}>{renderActionMode()}</Col>
                    </Row>
                </Space>
            </Card>
            {/* <Card
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
                        {renderFooterCenter()}
                    </div>
                    <div className='bulkprodmov-product-search-footer-right'>
                        
                    </div>
                </div>
            </Card> */}
            <ProgressFooter
                totalProgressCount={ 10 }
                totalCount={ 90 }
                isActionInProgress={ true }
                onStopButtonClick={handleStopButtonClick}
                isStoppingInProgress={ false }
                display={ true }
                danger={ false }
            />
        </React.Fragment>
    )
}

export default PreviewMove;