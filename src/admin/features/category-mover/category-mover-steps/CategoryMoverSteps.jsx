import { __ } from '@wordpress/i18n';
import { Card, Steps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const CategoryMoverSteps = () => {
    const { categoryMoverStepIndex } = useSelector((state) => state.categoryMover);

    const getStepItems = () => {
		let items = [
            {title: __( 'Source Categories', 'bulk-product-category-mover-for-woocommerce' ) },
            {title: __( 'Destination Categories', 'bulk-product-category-mover-for-woocommerce' ) },
            {title: __( 'Additional Options', 'bulk-product-category-mover-for-woocommerce' ) },
            {title: __( 'Preview & Move', 'bulk-product-category-mover-for-woocommerce' ) },
        ];

		return items;
	}

	return (
        <Steps
            size="default"
            current={categoryMoverStepIndex-1}
            items={getStepItems()}
        />
	)
}

export default CategoryMoverSteps;
