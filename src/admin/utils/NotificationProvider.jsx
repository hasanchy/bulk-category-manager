import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { __ } from '@wordpress/i18n';

// Create a context
const NotificationContext = createContext(null);

// Provider component
export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, messageText, descriptionText, options = {}) => {
        api[type || 'info']({
            message: __(messageText, 'bulk-category-manager'),
            description: __(descriptionText, 'bulk-category-manager'),
            placement: 'bottomRight',
            duration: 3,
            ...options,
        });
    };

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

// Hook for easy access
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a <NotificationProvider>');
    }
    return context;
};
