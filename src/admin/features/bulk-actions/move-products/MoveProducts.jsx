import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelector } from 'react-redux';

// import SourceCategories from './source-categories/SourceCategories';
// import DestinationCategories from './destination-categories/DestinationCategories';
// import AdditionalOptions from './additional-options/AdditionalOptions';
// import PreviewMove from './preview-move/PreviewMove';

const MoveProducts = () => {

    const { categoryMoverStepIndex } = useSelector((state) => state.categoryMover);

    useEffect(()=>{
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older Safari
    },[categoryMoverStepIndex]);

    const renderProductsMoverSteps = () => {
        if(categoryMoverStepIndex===1){
            return <SourceCategories />;
        }else if(categoryMoverStepIndex===2){
            return <DestinationCategories />;
        }else if(categoryMoverStepIndex===3){
            return <AdditionalOptions />;
        }else if(categoryMoverStepIndex===4){
            return <PreviewMove />;
        }
    }

    return (
        <React.Fragment>
            {renderProductsMoverSteps()}    
        </React.Fragment>
    )
}

export default MoveProducts;
