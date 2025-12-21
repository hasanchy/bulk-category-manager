import React, { useEffect, useMemo } from 'react';
import { ConfigProvider, Layout, Menu, App as AntdApp } from 'antd';
const { Header, Content } = Layout;
import { SettingOutlined, ProductOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import { setActiveTab } from './manuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../services/apiService';
import { NotificationProvider } from '../utils/NotificationProvider';
import CategoryMover from '../features/category-mover/CategoryMover';

const colorHighlight = window.bulkprodmovData.adminColors.highlight;

const menuItems = [
    {
        label: __('Category Mover', 'bulk-product-category-mover-for-woocommerce'),
        key: 'categoryMover',
        icon: <ProductOutlined />,
    },
    {
        label: __('Settings', 'bulk-product-category-mover-for-woocommerce'),
        key: 'settings',
        icon: <SettingOutlined />,
    },
];

const App = () => {

    const { activeTab  } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
	}, []);

    const tabComponents = useMemo(() => ({
        categoryMover: <CategoryMover></CategoryMover>,
        settings: <div>Settings</div>,
    }), []);

    const renderMenuContent = () => {
        return (
            <>
                {Object.entries(tabComponents).map(([key, Component]) => (
                    <div key={key} style={{ display: activeTab === key ? 'block' : 'none' }}>
                        {Component}
                    </div>
                ))}
            </>
        );
    }

    return(
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: colorHighlight,
                    margin:"0"
                },
            }}
        >
            <AntdApp>
                <NotificationProvider>  
                    <Layout
                        style={{background:'transparent'}}
                    >
                        <Header style={{ display: 'flex', alignItems: 'center', padding: '0px 20px' }}>
                            <h1 style={{ fontFamily: 'Trebuchet MS', fontWeight: 600, fontSize: '22px', marginBottom: '10px', marginRight: '50px' }}>
                                <span style={{ color: '#ffffff' }}>{__( 'Bulk Product Category Mover', 'bulk-product-category-mover-for-woocommerce' )}</span>
                            </h1>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['products']}
                                selectedKeys={activeTab}
                                items={menuItems}
                                style={{ flex: 1, minWidth: 0 }}
                                onClick={(e) => {
                                    dispatch( setActiveTab(e.key) );
                                }}
                            />
                        </Header>
                        <Content style={{ padding: '20px' }}>
                            {renderMenuContent()}
                        </Content>
                    </Layout>
                </NotificationProvider>
            </AntdApp>
        </ConfigProvider>
    );
}

export default App;