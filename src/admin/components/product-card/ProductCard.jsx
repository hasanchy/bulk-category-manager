import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Image, Typography, Button, Space, Row, Col, Skeleton, Tag, Popover, Alert } from 'antd';
import Icon, { ExportOutlined, AmazonOutlined, CloseCircleFilled, CheckSquareFilled, InfoCircleFilled, LoadingOutlined } from '@ant-design/icons';
const { Link } = Typography;
import { __ } from '@wordpress/i18n';

const colorHighlight = window.bulkprodmovData.adminColors.highlight;

const ProductCard = ({productData, displayBadge = false, status = null, message = null, deletable = false, onDeleteClick, selectable = false, selected = false, onSelectionClick}) => {

    const selectRef = useRef(true);

    let badgeColor = null;
    let badgeText = null;
    let infoMessage = null;
    let errorMessage = null;
    
    if( status ){
        if( status === 'inProgress' ){
            badgeColor = 'gold';
            badgeText = <LoadingOutlined />;
        }else if( status === 'success' ){
            badgeColor = 'green';
            badgeText = __('Imported', 'bulk-product-category-mover-for-woocommerce');
        }else if( status === 'failed' ) {
            badgeColor = 'red';
            badgeText = __('Failed', 'bulk-product-category-mover-for-woocommerce');
            errorMessage = message;
        }
    }else if( productData.is_eligible ){
        badgeColor = (selectable && !selected) ? '#8dd6d6' : 'cyan';
        badgeText = __('Eligible', 'bulk-product-category-mover-for-woocommerce');
    }else if( productData.reason === 'AlreadyImported' ){
        badgeColor = 'purple';
        badgeText = __('Already Imported', 'bulk-product-category-mover-for-woocommerce');
    }else if( productData.reason === 'OutOfStock' ){
        badgeColor = 'yellow';
        badgeText = __('Out of Stock', 'bulk-product-category-mover-for-woocommerce');
    }else if( productData.reason === 'MissingRequiredWords' ){
        badgeColor = 'orange';
        badgeText = __('Missing Required Words', 'bulk-product-category-mover-for-woocommerce');
        infoMessage = productData.message ? productData.message : __('Missing required words for import.', 'bulk-product-category-mover-for-woocommerce');
    }else if( productData.reason === 'ProhibitedWordsFound' ){
        badgeColor = 'pink';
        badgeText = __('Prohibited Words Found', 'bulk-product-category-mover-for-woocommerce');
        infoMessage = productData.message ? productData.message : __('Contains prohibited words.', 'bulk-product-category-mover-for-woocommerce');
    }else if( productData.reason === 'Invalid' ){
        badgeColor = 'red';
        badgeText = __('Invalid ASIN', 'bulk-product-category-mover-for-woocommerce');
        errorMessage = productData.message ? productData.message : __('Invalid ASIN.', 'bulk-product-category-mover-for-woocommerce');
    }

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
                    <CheckSquareFilled style={{ fontSize: '30px', color: colorHighlight }} />
                </div>
            }else{
                return <div style={{position:'absolute', insetInlineEnd:'6px', top:'5px', cursor:'pointer'}} onClick={handleSelection}>
                    <div style={{width:'26px', height:'26px', border:`2px solid ${colorHighlight}`, borderRadius:'3px'}}></div>
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

    const handleDelete = () => {
        onDeleteClick();
    }

    const handleSelection = () => {
        if(selectable && selectRef.current !== false){
            onSelectionClick();
        }

        selectRef.current = true;
    }

    const handleViewOnAmazon = () => {
        selectRef.current = false;
        window.open(removeTagParameter(productData.product_url), "_blank");
    }

    const handleViewProductPage = () => {
        selectRef.current = false;
        window.open(removeTagParameter(productData.post_url), "_blank");
    }

    const handleThumbnailGalleryClick = () => {
        selectRef.current = false;
    }

    const renderImageView = () => {
        let imageView;
        let previewImages = [];
        
        if(productData.image_primary){
            previewImages = productData.image_variants?.length
                ? [productData.image_primary, ...productData.image_variants]
                : [productData.image_primary];
        }

        if (productData.image_primary) {
            imageView = (
                <Image
                    src={productData.image_primary}
                    preview={false}
                    alt={productData.post_title}
                />
            );
        } else {
            imageView = (
                <Skeleton.Image style={{ width: "150px", height: "150px" }} />
            );
        }

        return (
            <>
                {/* Main Image */}
                <Row>
                    <Col span={24} align="center" style={{ marginTop: "10px" }}>
                        {imageView}
                    </Col>
                </Row>

                {/* Thumbnail Gallery */}
                {previewImages.length > 0 &&
                    <Row justify="center" style={{ marginTop: "10px" }} onClick={handleThumbnailGalleryClick}>
                        <Image.PreviewGroup items={previewImages}>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {previewImages.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        width={30}
                                        height={30}
                                        style={{
                                            border: `1px solid #d9d9d9`,
                                            borderRadius: "3px",
                                            objectFit: "cover",
                                            cursor: "pointer",
                                        }}
                                    />
                                ))}
                            </div>
                        </Image.PreviewGroup>
                    </Row>
                }
            </>
        );
    };

    const renderButtons = () => {
        let buttonView = null;
        if(productData.post_url){
            buttonView = <Space>    
                <Button type="default" title={__( 'View on Store', 'bulk-product-category-mover-for-woocommerce' )} onClick={handleViewProductPage}>
                    <ExportOutlined />
                </Button>
                <Button type="default" title={__( 'View on Amazon', 'bulk-product-category-mover-for-woocommerce' )} onClick={handleViewOnAmazon}>
                    <AmazonOutlined />
                </Button>
            </Space>
        }else if ( productData.product_url ){
            buttonView = <Button type="default" onClick={handleViewOnAmazon}>
                <AmazonOutlined /> {__( 'View on Amazon', 'bulk-product-category-mover-for-woocommerce' )}
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

    const renderErrorMessage = () => {
        if(errorMessage){
            return <Alert type='error' message={errorMessage} />
        }
        return null;
    }

    const renderProductTitle = () => {
        if(productData.product_url) {
            return <Row>
                <Col span="24" align="center">
                    <Link onClick={handleViewOnAmazon}>{decodeString(productData.post_title)}</Link>
                </Col>
            </Row>
        }
        return null;
    }

    const renderProductCondition = () => {
        if(productData.condition) {
            let conditionColor = ( productData.condition === 'New' ) ? 'blue' : 'gold';
            return <Row>
                <Col span="24" align="center">
                    <Tag color={conditionColor} title={__( 'Condition', 'bulk-product-category-mover-for-woocommerce' )}>{productData.condition}</Tag>
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

    const renderCard = () => {
        let cardClass = (selected) ? 'bulkprodmov-product-card-selected' : 'bulkprodmov-product-card';
        return <Card className={cardClass} style={{cursor: selectable? 'pointer' : 'default'}} onClick={handleSelection}>
            {renderDeleteIcon()}
            {renderSelectIcon()}
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {renderImageView()}
                {renderProductTitle()}
                {renderProductCondition()}
                {renderProductPrice()}
                {renderButtons()}
                {renderErrorMessage()}
            </Space>
        </Card>
    }

    const renderCardWithBadge = () => {
        let ribbonText;

        let ribbonClass = (selected) ? 'bulkprodmov-product-card-ribbon-selected' : 'bulkprodmov-product-card-ribbon';

        if( infoMessage ){
            ribbonText = <Space>
                {badgeText}
                <Popover content={infoMessage} placement="top" trigger="hover">
                    <InfoCircleFilled style={{ cursor: 'pointer' }} />
                </Popover>
            </Space>;
        }else{
            ribbonText = badgeText;
        }

        return <Badge.Ribbon color={badgeColor} text={ribbonText} placement='start' className={ribbonClass}>
            {renderCard()}
        </Badge.Ribbon>
    }

    return(
        <div style={{padding:'15px'}}>
            {displayBadge ? (
                renderCardWithBadge()
            ) : (
                renderCard()
            )}
        </div>
    );
}

export default ProductCard;