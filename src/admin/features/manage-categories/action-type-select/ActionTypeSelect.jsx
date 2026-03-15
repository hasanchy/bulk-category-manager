import React from 'react';
import { Card, Space } from 'antd';
import ActionTypeCards from './ActionTypeCards';
import { EditOutlined, NumberOutlined, SearchOutlined } from '@ant-design/icons';

// import { setImportType } from '../importSlice';
import { useDispatch } from 'react-redux';
import { __ } from '@wordpress/i18n';


const ActionTypeSelect = () => {

    const dispatch = useDispatch();

    const handleActionTypeSelect = (type) => {
        // dispatch(setImportType(type));
    }

    return (
        <React.Fragment>
            <Space orientation='vertical'
            style={{
                display: 'flex',
            }}>
                <Card
                    title={__( 'Select Action Type', 'auto-amazon-affiliate-for-woocommerce' )}
                >
                    <Space
                        orientation='vertical'
                        size="large"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <ActionTypeCards
                            items={[
                                {
                                    key: 'search-keyword',
                                    label: __( 'Move Products', 'auto-amazon-affiliate-for-woocommerce' ),
                                    icon: <SearchOutlined/>
                                },
                                {
                                    key: 'copy-paste',
                                    label: __( 'Import by ASIN Code', 'auto-amazon-affiliate-for-woocommerce' ),
                                    icon: <NumberOutlined/>
                                },
                                {
                                    key: 'manual-entry',
                                    label: __( 'Add Product Manually', 'auto-amazon-affiliate-for-woocommerce' ),
                                    icon: <EditOutlined/>
                                }
                            ]}
                            onClick={handleActionTypeSelect}
                        />
                        
                    </Space>
                </Card>
            </Space>
        </React.Fragment>
    )
}

export default ActionTypeSelect;
