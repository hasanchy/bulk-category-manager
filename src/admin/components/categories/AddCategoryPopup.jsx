import React, { useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { createCategory } from '../../services/apiService';
import { useSelector } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { useNotification } from '../../utils/NotificationProvider';

const AddCategoryPopup = ({ isOpen, onCancel, onSuccess }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { categories, isLoading } = useSelector((state) => state.categories);

    const { openNotification } = useNotification();

    const formatCategories = (categories, prefix = '') => {
        return categories.map(category => ({
        value: category.term_id,
        label: prefix + category.name?.replace(/&amp;/g, "&"),
        children: category.children && category.children.length > 0
            ? formatCategories(category.children, prefix + '-- ')
            : undefined
        }));
    };

    const categoryOptions = useMemo(() => formatCategories(categories), [categories]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await createCategory(values);
            openNotification(
                'success', 
                'Category Created', 
                'Category created successfully'
            );
            form.resetFields();
            onSuccess();
        } catch (error) {
            openNotification(
                'error', 
                'Category Failed', 
                'Failed to create category'
            );
        } finally {
            setLoading(false);
        }
    };

    // Custom filter function for the Select component
    const filterOption = (input, option) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return (
        <Modal
            open={isOpen}
            title={__('Add New Category', 'bulk-category-manager')}
            onCancel={onCancel}
            footer={null}
        >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
                name="name"
                label={__('Category Name', 'bulk-category-manager')}
                rules={[{ required: true, message: __('Please enter category name', 'bulk-category-manager') }]}
            >
            <Input />
            </Form.Item>
            <Form.Item name="parent" label={__('Parent Category', 'bulk-category-manager')}>
            <Select
                placeholder={__('Select parent category', 'bulk-category-manager')}
                allowClear
                showSearch
                filterOption={filterOption}
                options={categoryOptions}
                loading={isLoading}
                disabled={isLoading}
                optionFilterProp="label"
            />
            </Form.Item>
            <Form.Item name="description" label={__('Description', 'bulk-category-manager')}>
            <Input.TextArea />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                {__('Create Category', 'bulk-category-manager')}
            </Button>
            </Form.Item>
        </Form>
        </Modal>
    );
};

export default AddCategoryPopup;
