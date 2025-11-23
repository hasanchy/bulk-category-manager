import { notification } from 'antd';
import { __ } from '@wordpress/i18n';

/**
 * Show a reusable Ant Design notification.
 *
 * @param {string} type - Notification type (success, info, warning, error).
 * @param {string} messageText - Main notification title.
 * @param {string} descriptionText - Detailed description.
 * @param {object} options - Optional overrides (placement, duration, etc.).
 */
export const openNotification = (type, messageText, descriptionText, options = {}) => {
	notification.open({
		type,
		message: __(messageText, 'bulk-product-category-mover-for-woocommerce'),
		description: __(descriptionText, 'bulk-product-category-mover-for-woocommerce'),
		placement: 'bottomRight',
		duration: 3,
		...options, // allow custom duration, placement, etc.
	});
};
