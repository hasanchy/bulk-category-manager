import React, {useEffect, useState} from 'react';
import { Card, Typography, Row, Col, Flex } from 'antd';
import { __ } from '@wordpress/i18n';
const { Title, Text } = Typography;
import { CheckCircleFilled } from '@ant-design/icons';

// const BulkActionCard = ({ selected, onClick, icon, label, description }) => {

//     const iconColor = selected
//         ? 'rgba(0,0,0,0.85)'
//         : 'rgba(0,0,0,0.45)';

//     const boxShadow = selected
//         ? '0 4px 12px rgba(0,0,0,0.15)'
//         : '0 1px 3px rgba(0,0,0,0.08)';

//     const borderColor = selected
//         ? '#1677ff'
//         : 'rgba(0,0,0,0.15)';

//     return (
//         <Card
//             hoverable
//             onClick={onClick}
//             style={{
//                 width: 260,
//                 height: 240,
//                 border: `1px solid ${borderColor}`,
//                 boxShadow: boxShadow,
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 textAlign: 'center',
//                 paddingTop: 10
//             }}
//             bodyStyle={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100%'
//             }}
//         >

//             {/* Icon */}
//             <div
//                 style={{
//                     fontSize: 64,
//                     color: iconColor,
//                     marginBottom: 12
//                 }}
//             >
//                 {icon}
//             </div>

//             {/* Title */}
//             <Title
//                 level={5}
//                 style={{
//                     marginBottom: 8,
//                     color: iconColor
//                 }}
//             >
//                 {__(label, 'bulk-category-manager')}
//             </Title>

//             {/* Description */}
//             <Text
//                 type="secondary"
//                 style={{
//                     textAlign: 'center',
//                     fontSize: 13,
//                     maxWidth: 200
//                 }}
//             >
//                 {description}
//             </Text>

//         </Card>
//     );
// };

const BulkActionCard = ({onClick, icon, label, description}) => {
    let iconColor = 'rgba(0, 0, 0, 0.55)';
    let boxShadow = '';
    return (
        <div onClick={onClick}>
            <Card
                style={{
                    width: '250px',
                    height: '250px',
                    border: '1px solid rgba(0, 0, 0, 0.16)',
                    boxShadow: boxShadow,
                    textAlign: 'center',
                }}
                hoverable
            >
                {/* Icon */}
            <div
                style={{
                    fontSize: 64,
                    color: iconColor,
                    marginBottom: 12
                }}
            >
                {icon}
            </div>

            {/* Title */}
            <Title
                level={5}
                style={{
                    marginBottom: 8,
                    color: iconColor
                }}
            >
                {__(label, 'bulk-category-manager')}
            </Title>

            {/* Description */}
            <Text
                type="secondary"
                style={{
                    textAlign: 'center',
                    fontSize: 13,
                    maxWidth: 200
                }}
            >
                {description}
            </Text>
                {/* <Row>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <span style={{fontSize:'70px', color:iconColor}}>{icon}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Title level={5} style={{color: iconColor}}>{__(label, 'bulk-category-manager')}</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{display: 'flex', height:'25px', marginBottom:'20px', justifyContent: 'right'}}>
                        {description}  
                    </Col>
                </Row> */}
            </Card>
        </div>
    )
}

const ActionTypeCards = (props) => {
    const [selectedCard, setSelectedCard] = useState('');
    useEffect(()=>{
        if(props.defaultSelectedKey){
            setSelectedCard(props.defaultSelectedKey);
        }
    },[]);
    
    const handleCardSelect = (key) => {
        props.onClick(key);
        // setSelectedCard(key);
    }

    const renderCards = () => {
        let items = props.items ?? [];
        
        let cards = [];
        for(let i in items){
            let isSelected = selectedCard === items[i].key;
            cards.push(
                <BulkActionCard 
                    key={items[i].key} 
                    type={items[i].key}
                    label={items[i].label} 
                    description={items[i].description} 
                    icon={items[i].icon} 
                    onClick={handleCardSelect.bind(this, items[i].key)}
                />
            );
        }

        return cards;
    }

    return (
        <Flex wrap="wrap" gap={100} justify='center'>
            {renderCards()}
        </Flex>
    )
}

export default ActionTypeCards;
