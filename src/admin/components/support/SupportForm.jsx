import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { sendSupportMessage } from '../../services/apiService'; // Import the new API request

const { TextArea } = Input;

const SupportForm = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState({type: '', content: ''});
    const [loading, setLoading] = useState(false); // New loading state
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setLoading(true); // Set loading to true when sending the message
        try {
            const response = await dispatch(sendSupportMessage({
                email: values.email,
                message: values.message,
            }));
            if (sendSupportMessage.fulfilled.match(response)) {
                setMessage({type: 'success', content: __('Your message has been sent!', 'bulk-category-manager')});
                form.resetFields(); // Reset the form fields after submission
            } else {
                setMessage({type: 'error', content: __('Failed to send the message. Please try again later.', 'bulk-category-manager')});
            }
        } catch (error) {
            setMessage({type: 'error', content: __('Failed to send the message. Please try again later.', 'bulk-category-manager')});
        } finally {
            setLoading(false); // Reset loading state after the operation
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Typography.Paragraph>
                {__('If you need assistance, encounter any issues, or have suggestions, please reach out to us using the form below.', 'bulk-category-manager')}
            </Typography.Paragraph>
            <Form
                name="supportForm"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label={__( 'Your email address', 'bulk-category-manager' )}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: __( 'Please input your email address!', 'bulk-category-manager' ),
                        },
                        {
                            type: 'email',
                            message: __( 'The input is not valid E-mail!', 'bulk-category-manager' ),
                        },
                    ]}
                >
                    <Input placeholder="Email..." />
                </Form.Item>
                <Form.Item
                    name="message"
                    label={__('Message', 'bulk-category-manager')}
                    rules={[
                        {
                            required: true,
                            message: __( 'Please input your message!', 'bulk-category-manager' ),
                        },
                    ]}
                >
                    <TextArea placeholder="Enter your message here." rows={8} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}> {/* Disable button while loading */}
                        {__('Submit', 'bulk-category-manager')}
                    </Button>
                </Form.Item>
            </Form>
            {message.content && <Alert message={message.content} type={message.type} />} {/* Display success or error message here */}
        </>
    );
};

export default SupportForm;