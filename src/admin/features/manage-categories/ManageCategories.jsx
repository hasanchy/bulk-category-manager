import React from 'react';
import { useSelector } from 'react-redux';
import ActionTypeSelect from './action-type-select/ActionTypeSelect';

const ManageCategories = () => {

    const { manageCategoriesType } = useSelector((state) => state.manageCategories);

    const renderManageCategoriesStepContent = () => {
        if(manageCategoriesType==='type-select'){
            return <ActionTypeSelect />;
        }
        return null;
    }

	return (
		<React.Fragment>
            {renderManageCategoriesStepContent()}
		</React.Fragment>
	)
}

export default ManageCategories;