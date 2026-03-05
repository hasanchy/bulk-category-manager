import React from 'react';
import { Badge, Card, Image, Typography, Button, Space, Row, Col, Skeleton } from 'antd';
import { EyeOutlined, AmazonOutlined, CloseCircleFilled, CheckSquareFilled } from '@ant-design/icons';
const { Link, Text } = Typography;
import { __ } from '@wordpress/i18n';

const ImageCard = ({productData, displayBadge = false, badgeColor = false, badgeText = false, deletable = false, onDeleteClick, selectable = false, selected = false, onSelectionClick}) => {

    const decodeString = ( rawString ) => {
		const parser = new DOMParser();
  		const decodedString = parser.parseFromString(rawString, 'text/html').body.textContent;
		return decodedString;
	}

    const renderDeleteIcon = () => {
        if(deletable){
            return <div style={{position:'absolute', insetInlineEnd:'-5px', top:'-5px', cursor:'pointer'}} onClick={handleDelete}>
                <CloseCircleFilled style={{ fontSize: '22px', color: '#999' }} />
            </div>
        }
    }

    const renderSelectIcon = () => {
        if(selectable){
            if(selected){
                return <div style={{position:'absolute', insetInlineEnd:'4px', top:'3px', cursor:'pointer'}} onClick={handleSelection}>
                    <CheckSquareFilled style={{ fontSize: '25px', color: '#672fb4' }} />
                </div>
            }else{
                return <div style={{position:'absolute', insetInlineEnd:'5px', top:'5px', cursor:'pointer'}} onClick={handleSelection}>
                    <div style={{width:'20px', height:'20px', border:'1px solid #672fb4', borderRadius:'3px'}}></div>
                </div>
            }
        }
    }

    const removeTagParameter = ( url ) => {
        if(url){
            const tagIndex = url.indexOf('?tag');
            return tagIndex !== -1 ? url.substring(0, tagIndex) : url;
        }
        return url;
    }

    const renderImageView = () => {
        let imageView;
        if(productData.image_primary){
            if(productData.image_variants?.length){
                let previewImages = [productData.image_primary, ...productData.image_variants]
                imageView = <Image.PreviewGroup
                    items={previewImages}
                >
                    <Image src={productData.image_primary}/>
                </Image.PreviewGroup>
            }else{
                imageView= <Image src={productData.image_primary} preview={true} alt={productData.post_title}/>
            }
        }else{
            imageView = <Skeleton.Image style={{ width: "150px", height: "150px" }} />
        }

        return <Row>
            <Col span="24" align="center" style={{marginTop:'10px'}}>
                {imageView}
            </Col>
        </Row>
    }

    const renderButtons = () => {
        let buttonView = null;
        if(productData.post_url){
            buttonView = <Space>    
                <Button type="default" href={productData.post_url} target='_blank'>
                    <EyeOutlined />
                </Button>
                <Button type="default" href={removeTagParameter( productData.product_url )} target='_blank'>
                    <AmazonOutlined />
                </Button>
            </Space>
        }else if ( productData.product_url ){
            buttonView = <Button type="default" href={removeTagParameter( productData.product_url )} target='_blank'>
                <AmazonOutlined /> {__( 'View on Amazon', 'bulk-category-manager' )}
            </Button>
        }

        if(buttonView){
            return <Row>
                <Col span="24" align="center">
                    {buttonView}
                </Col>
            </Row>
        }
        return null;
    }

    const renderProductTitle = () => {
        if(productData.post_url) {
            return <Row>
                <Col span="24" align="center">
                    <Link href={productData.post_url} target="_blank">{decodeString(productData.post_title?.substring(0, 100))}...</Link>
                </Col>
            </Row>
        }else if(productData.product_url) {
            return <Row>
                <Col span="24" align="center">
                    <Link href={removeTagParameter( productData.product_url )} target="_blank">{decodeString(productData.post_title?.substring(0, 100))}...</Link>
                </Col>
            </Row>
        }
        return null;
    }

    const renderErrorMessage = () => {
        if(productData.Message){
            return <Row>
                <Col span="24" align="center">
                    <Text type="danger">{productData.Message}</Text>
                </Col>
            </Row>
        }
        return null;
    }

    const renderProductPrice = () => {
        if(productData.price_html){
            return <Row>
                <Col span="24" align="center">
                    <div 
                        className="price-html"
                        dangerouslySetInnerHTML={{ __html: decodeString(productData.price_html) }}
                    />
                </Col>
            </Row>
        }
        return null;
    }

    const handleDelete = () => {
        onDeleteClick();
    }

    const handleSelection = () => {
        onSelectionClick();
    }

    const renderCard = () => {
        let cardClass = (selected) ? 'bulkcatman-product-card-selected' : 'bulkcatman-product-card';
        return <Card className={cardClass} style={{padding:'0px!important'}}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {renderImageView()}
            </Space>
        </Card>
    }

    const renderCardWithBadge = () => {
        let ribbonText;
        let ribbonColor;
        if( badgeColor && badgeText ){
            ribbonColor = badgeColor;
            ribbonText = badgeText;
        }
        else if(productData.import_status === 'invalid'){
            ribbonColor = 'red';
            ribbonText = __( 'Invalid ASIN', 'bulk-category-manager' );
        }else if( productData.import_status === 'alreadyimported' ){
            ribbonColor = 'pink';
            ribbonText = __( 'Previously Imported', 'bulk-category-manager' );
        }else if( productData.import_status === 'outofstock' ){
            ribbonColor = 'orange';
            ribbonText = __( 'Out of Stock', 'bulk-category-manager' );
        }else{
            ribbonColor = 'cyan';
            ribbonText = __( 'In Stock', 'bulk-category-manager' );
        }

        return <Badge.Ribbon color={ribbonColor} text={ribbonText} placement='start'>
            {renderCard()}
        </Badge.Ribbon>
    }

    return(
        <div style={{padding:'15px'}}>
            {renderCard()}
        </div>
    );
}

export default ImageCard;