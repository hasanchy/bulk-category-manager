import React from 'react';
import { Card, Space } from 'antd';
import ActionTypeCards from './ActionTypeCards';
import { CloseOutlined, DeleteOutlined, EditOutlined, NumberOutlined, SwapOutlined } from '@ant-design/icons';

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
                    title={__( 'Select Action Type', 'bulk-category-manager' )}
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
                                    key: 'move-products',
                                    label: __( 'Move Products', 'bulk-category-manager' ),
                                    description: __( 'Move products from one category to another.', 'bulk-category-manager' ),
                                    icon: <SwapOutlined/>
                                },
                                {
                                    key: 'remove-from-category',
                                    label: __( 'Remove from Category', 'bulk-category-manager' ),
                                    description: __( 'Remove products from a category.', 'bulk-category-manager' ),
                                    icon: <CloseOutlined/>
                                },
                                {
                                    key: 'manual-entry',
                                    label: __( 'Merge Products', 'bulk-category-manager' ),
                                    description: __( 'Merge products into the selected category.', 'bulk-category-manager' ),
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
