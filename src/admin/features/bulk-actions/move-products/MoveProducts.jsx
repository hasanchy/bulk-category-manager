import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelector } from 'react-redux';

import SourceCategories from './source-categories/SourceCategories';
// import DestinationCategories from './destination-categories/DestinationCategories';
// import AdditionalOptions from './additional-options/AdditionalOptions';
// import PreviewMove from './preview-move/PreviewMove';

const MoveProducts = () => {

    const { moveProductsStepIndex } = useSelector((state) => state.moveProducts);

    useEffect(()=>{
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older Safari
    },[moveProductsStepIndex]);

    const renderProductsMoverSteps = () => {
        if(moveProductsStepIndex===2){
            // return <div>{__('Source Categories Step')}</div>;
            return <SourceCategories />;
        }else if(moveProductsStepIndex===2){
            // return <DestinationCategories />;
        }else if(moveProductsStepIndex===3){
            // return <AdditionalOptions />;
        }else if(moveProductsStepIndex===4){
            // return <PreviewMove />;
        }
    }

    return (
        <React.Fragment>
            {renderProductsMoverSteps()}    
        </React.Fragment>
    )
}

export default MoveProducts;
