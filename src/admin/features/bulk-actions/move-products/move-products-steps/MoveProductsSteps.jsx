import { __ } from '@wordpress/i18n';
import { Card, Steps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const MoveProductsSteps = () => {
    const { moveProductsStepIndex } = useSelector((state) => state.moveProducts);

    const getStepItems = () => {
		let items = [
            {title: __( 'Move Products', 'bulk-category-manager' ) },
            {title: __( 'Source Categories', 'bulk-category-manager' ) },
            {title: __( 'Target Categories', 'bulk-category-manager' ) },
            {title: __( 'Preview & Move', 'bulk-category-manager' ) },
        ];

		return items;
	}

	return (
        <Steps
            size="default"
            current={moveProductsStepIndex-1}
            items={getStepItems()}
        />
	)
}

export default MoveProductsSteps;
