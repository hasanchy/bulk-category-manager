import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Card, Col, Divider, Flex, Row, Space, Tag } from 'antd';
import { DoubleRightOutlined, EditOutlined, ExportOutlined, ForwardOutlined, LeftOutlined, RightOutlined, SearchOutlined, SwapRightOutlined, SyncOutlined } from '@ant-design/icons';
import MoveProductsSteps from '../move-products-steps/MoveProductsSteps';
import { setMoveProductsStepIndex, setIsProductCategoriesMoving, setIsProductMovingStopping, setTotalMovedCount, setTotalToMoveCount } from '../moveProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, moveProductCategories } from '../../../../services/apiService';
import MoveFooter from './MoveFooter';

const ConfirmMove = () => {

    const dispatch = useDispatch();
    const stopMovingProducts = useRef(false);

    const { sourceCategoryIds, targetCategoryIds, actionMode, isProductCategoriesMoving, isProductMovingStopping } = useSelector((state) => state.categoryMover);

    useEffect(()=>{
        if(isProductMovingStopping){
            stopMovingProducts.current = true;
        }
    }, [isProductMovingStopping]);

    const handleBack = () => {
        dispatch( setMoveProductsStepIndex(3) );
    }

    const handleProductMove = async () => {
        
        stopMovingProducts.current = false;
        dispatch( setIsProductCategoriesMoving( true ) );
        dispatch( setIsProductMovingStopping( false ) );

        let data = {
            source_categories: sourceCategoryIds.map(category => category.id),
            target_categories: targetCategoryIds.map(category => category.id),
            batch_size: 10
        };

        let totalMovedCount = 0;

        let totalIterations = Math.ceil( 200/10 );
        let i = 0;

        dispatch( setTotalToMoveCount(200) );
        dispatch( setTotalMovedCount(0) );

        let failed = 0;
        while(i < totalIterations){
            let response = await dispatch( moveProductCategories(data) );
            let total = Number( response.payload?.moved ?? 0 );
            
            if( total > 0 ){
                totalMovedCount += total;

                dispatch( setTotalMovedCount (totalMovedCount) );
            }else{
                failed++;
                if(failed === 2){
                    break;
                }
            }

            i++;
            if(stopMovingProducts.current === true){
                break;
            }
        }

        dispatch( setTotalMovedCount(200) );
        await dispatch( fetchCategories() );
        dispatch( setIsProductCategoriesMoving( false ) );
        dispatch( setIsProductMovingStopping( false ) );
        
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

    const renderFooterCenter = () => {
        return <Flex justify='center'>
            <Button
                icon={<DoubleRightOutlined />}
                iconPlacement="end"
                type="primary" 
                loading={isProductCategoriesMoving}
                onClick={handleProductMove}
            >
                { __( 'Move 1020 Products', 'bulk-category-manager' ) }
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

    const renderTargetCategories = () => {
        return <Space wrap>
            {targetCategoryIds.map((category, index) => (
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

        let actionModeLabel = (actionMode === 'move') ? __( 'Move Products', 'bulk-category-manager' ) : __( 'Copy Products', 'bulk-category-manager' );

        return <Tag>
            {actionModeLabel}
        </Tag>
    }

    const handleStopButtonClick = () => {
        
    }

    const renderFooter = () => {

        if(isProductCategoriesMoving){
            return <MoveFooter/>
        }else{
            return <Card
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
                        {renderFooterCenter()}
                    </div>
                    <div className='bulkcatman-product-search-footer-right'>
                        
                    </div>
                </div>
            </Card>
        }
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
                    <Divider orientation="left">
                        <Space>
                            { __('Source Categories', 'bulk-category-manager' ) } <EditOutlined style={{cursor:'pointer'}} onClick={() => dispatch(setMoveProductsStepIndex(1))}/>
                        </Space>
                    </Divider>
                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: 'right'}}>{ __('Categories', 'bulk-category-manager' ) }</Col>
                        <Col span={16}>{renderSourceCategories()}</Col>
                    </Row>
                    <Divider orientation="left">
                        <Space>
                            { __('Target Categories', 'bulk-category-manager' ) } <EditOutlined style={{cursor:'pointer'}} onClick={() => dispatch(setMoveProductsStepIndex(2))}/>
                        </Space>
                    </Divider>
                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: 'right'}}>{ __('Categories', 'bulk-category-manager' ) }</Col>
                        <Col span={16}>{renderTargetCategories()}</Col>
                    </Row>
                    <Divider orientation="left">
                        <Space>
                            { __('Additional Options', 'bulk-category-manager' ) } <EditOutlined style={{cursor:'pointer'}} onClick={() => dispatch(setMoveProductsStepIndex(3))}/>
                        </Space>
                    </Divider>
                    <Row gutter={16}>
                        <Col span={8} style={{ textAlign: 'right'}}>{ __('Action mode', 'bulk-category-manager' ) }</Col>
                        <Col span={16}>{renderActionMode()}</Col>
                    </Row>
                </Space>
            </Card>
            {renderFooter()}
        </React.Fragment>
    )
}

export default ConfirmMove;