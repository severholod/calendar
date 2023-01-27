import React, {FC} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {IAuthFormData} from "../models/IForm";



const initialValues : IAuthFormData = {
    password: '',
    username: '',
    remember: false
}


export const LoginForm: FC = () => {
    const {isLoading, error} = useTypedSelector(state => state.authReducer)
    const {login} = useActions()
    const submit = (data: IAuthFormData) => {
        login(data.username, data.password)
    }
    return (
        <Form
            onFinish={submit}
            initialValues={initialValues}
        >
            {error && <div className="error-message">{error}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}

            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};
