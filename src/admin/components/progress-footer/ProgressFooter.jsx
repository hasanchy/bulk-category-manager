import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Checkbox, Flex, Progress, Space, Tag } from 'antd';
import { LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

const ProgressFooter = ( { totalProgressCount, totalCount, isActionInProgress, onStopButtonClick, isStoppingInProgress, display = true, danger = false } ) => {
    
    const calculatePercent = () => {
        let percent = totalCount > 0 ? Math.round( ( totalProgressCount/totalCount ) * 100 ) : 0;
        return percent <= 100 ? percent : 100;
    }

    const renderFooterLeft = () => {
        return <Flex justify='flex-start'>
            <Space>
                {isActionInProgress && <LoadingOutlined />}
                <span style={{fontSize:'20px', fontWeight: 'bold'}}>{totalProgressCount}</span>
            </Space>
        </Flex>
    }

    const renderFooterCenter = () => {
        let from = danger ? '#ff4d4f' : '#672fb4';
        let to = danger ? '#c93e40' : '#46207a';
        return <Progress
            percent={calculatePercent()}
            status="active"
            strokeColor={{
                from,
                to,
            }}
            showInfo={true} 
        />
    }

    const renderFooterRight = () => {
        return <Flex justify='flex-end'>
            <Button
                iconPosition="end"
                type="default"
                onClick={onStopButtonClick}
                disabled={!isActionInProgress}
                loading={isStoppingInProgress}
            >
                {__('Stop', 'product-cleaner')}
            </Button>
        </Flex>;
    }

    if(display){
        return (
            <Card
                size='small'
                style={{
                    position: 'sticky',
                    bottom: '-1px',
                    zIndex: '999',
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
                        {renderFooterRight()}
                    </div>
                </div>
            </Card>
        )
    }else{
        return null;
    }
}

export default ProgressFooter;
