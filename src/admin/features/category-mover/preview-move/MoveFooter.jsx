import React from 'react';
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import ProgressFooter from '../../../components/progress-footer/ProgressFooter';
import { setIsProductMovingStopping } from '../categoryMoverSlice';

const MoveFooter = () => {
    const dispatch = useDispatch();
    const { totalToMoveCount, totalMovedCount, isProductCategoriesMoving, isProductMovingStopping } = useSelector((state) => state.categoryMover);

    const handleStopButtonClick = () => {
        dispatch( setIsProductMovingStopping(true) );
    }
    
    return (
        <ProgressFooter
            totalCount={ totalToMoveCount }
            totalProgressCount={ totalMovedCount }
            isActionInProgress={ isProductCategoriesMoving }
            onStopButtonClick={handleStopButtonClick}
            isStoppingInProgress={isProductMovingStopping}
            display={ true }
            danger={false}
        />
    );
};

export default MoveFooter;