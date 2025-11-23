import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Tag, Space, Popover, Select } from 'antd';
import { PlusOutlined, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

const MultiKeywordsInput = ({
    value = [],
    option = 'or',
    onChange = () => {},
    onOptionChange = () => {},
    disabled = false,
    tagColor='green',
    optionAllDescription = '',
    optionAnyDescription = ''
}) => {
    const [inputKeyword, setInputKeyword] = useState('');

    const handleAddNewKeyword = () => {
        const trimmed = inputKeyword.trim();
        if (!trimmed || value.includes(trimmed)) return;

        const updated = [...value, trimmed];
        setInputKeyword('');
        onChange(updated); // parent owns value
    };

    const handleRemoveKeyword = (keywordToRemove) => {
        const updated = value.filter(k => k !== keywordToRemove);
        onChange(updated);
    };

    const handleOptionValueChange = (newOption) => {
        onOptionChange(newOption); // parent owns option
    };

    const renderOptions = () => {
        if (value.length > 1) {
            return (
                <Space style={{marginTop:'15px'}}>
                    <Select size='small' onChange={handleOptionValueChange} value={option} style={{width:'110px'}}>
                        <Select.Option value='or'>{__('Match any', 'bulk-product-category-mover-for-woocommerce')}</Select.Option>
                        <Select.Option value='and'>{__('Match all ', 'bulk-product-category-mover-for-woocommerce')}</Select.Option>
                    </Select>
                    <Popover content={popoverContent} placement="right" trigger="hover">
                        <InfoCircleOutlined style={{ cursor: 'pointer' }} />
                    </Popover>
                </Space>
            );
        }
        return null;
    };

    const popoverContent = (
        <ul style={{ paddingLeft: 16, margin: 0 }}>
            <li><b>{__('Match any', 'bulk-product-category-mover-for-woocommerce')}</b> - {optionAnyDescription}</li>
            <li><b>{__('Match all', 'bulk-product-category-mover-for-woocommerce')}</b> - {optionAllDescription}</li>
        </ul>
    );

    const renderSelectedKeywords = () => {
        if (value.length > 0) {
            return (
                <>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}>
                            <Space wrap>
                                {value.map((keyword, index) => (
                                    <React.Fragment key={index}>
                                        <Tag
                                            key={keyword}
                                            color={tagColor}
                                            closable={!disabled}
                                            onClose={(e) => {
                                                e.preventDefault();
                                                handleRemoveKeyword(keyword);
                                            }}
                                            style={{
                                                paddingRight: '25px',
                                                position: 'relative'
                                            }}
                                            closeIcon={
                                                <CloseOutlined
                                                    style={{
                                                        position: 'absolute',
                                                        right: '5px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        fontSize: '12px',
                                                        padding: '4px',
                                                        borderRadius: '50%'
                                                    }}
                                                />
                                            }
                                        >
                                            {option === 'and' || value.length === 1 ? <b>{keyword}</b> : keyword}
                                        </Tag>
                                    </React.Fragment>
                                ))}
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {renderOptions()}
                        </Col>
                    </Row>
                </>
            );
        }
        return null;
    };

    return (
        <div>
            <Row gutter={[16, 16]} align="middle">
                <Col flex="auto">
                    <Input
                        value={inputKeyword}
                        onChange={(e) => setInputKeyword(e.target.value)}
                        onPressEnter={handleAddNewKeyword}
                        onBlur={handleAddNewKeyword}
                    />
                </Col>
                <Col flex="none">
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddNewKeyword}
                            disabled={!inputKeyword}
                        />
                    </Space>
                </Col>
            </Row>
            {renderSelectedKeywords()}
        </div>
    );
};

export default MultiKeywordsInput;
