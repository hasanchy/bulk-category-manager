import { __ } from '@wordpress/i18n';
import { Card, Steps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const CategoryMoverSteps = () => {
    const { categoryMoverStepIndex } = useSelector((state) => state.categoryMover);

    const getStepItems = () => {
		let items = [
            {title: __( 'Source Categories', 'bulk-category-manager' ) },
            {title: __( 'Destination Categories', 'bulk-category-manager' ) },
            {title: __( 'Additional Options', 'bulk-category-manager' ) },
            {title: __( 'Preview & Move', 'bulk-category-manager' ) },
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
