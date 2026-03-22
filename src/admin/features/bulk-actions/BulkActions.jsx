import React from 'react';
import { useSelector } from 'react-redux';
import ActionTypeSelect from './action-type-select/ActionTypeSelect';
import MoveProducts from './move-products/MoveProducts';

const BulkActions = () => {

    const { bulkActionsType } = useSelector((state) => state.bulkActions);

    const renderBulkActionsStepContent = () => {
        if(bulkActionsType==='type-select'){
            return <ActionTypeSelect />;
        }else if(bulkActionsType==='move-products'){
            return <MoveProducts />;
        }
        return null;
    }

	return (
		<React.Fragment>
            {renderBulkActionsStepContent()}
		</React.Fragment>
	)
}

export default BulkActions;