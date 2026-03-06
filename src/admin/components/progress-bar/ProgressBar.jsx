import React from 'react';
import { Card, Flex, Progress } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { darkenColor } from '../../utils/mainUtils';

const ProgressBar = ({percent, color = 'purple'}) => {
	
    let strokeColor;
    if(color === 'green' ){
        strokeColor = {
            from: '#52c41a',
            to: '#3f9714',
        };
    }else{
        strokeColor = {
            from: window.bulkcatmanData.adminColors.highlight,
            to: darkenColor( window.bulkcatmanData.adminColors.highlight, 75),
        };
    }
	return (
		<div style={{display: 'flex', width:'100%'}}>
			<SyncOutlined spin={true} style={{marginRight: '10px'}}/> 
			<Progress
				percent={percent}
				status="active"
				strokeColor={strokeColor}
				showInfo={true} 
			/>
		</div>
	);
};

export default ProgressBar;