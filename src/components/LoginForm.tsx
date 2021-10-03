import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";

const LoginForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {error, isLoading} = useTypeSelector(state => state.authReducer)
    const {loginWithEmail} = useActions()

    const submit = () => {
        loginWithEmail(email, password)
    }

    return (
        <>
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: 'red'}}>{error}</div>}
            <Form.Item
                label='Username'
                name='username'
                rules={[rules.required('Please input your username!')]}
            >
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label='Password'
                name='Password'
                rules={[rules.required('Please input your password!')]}
            >
                <Input value={password}
                       onChange={e => setPassword(e.target.value)}
                       type="password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
                <Button></Button>
            </Form.Item>
        </Form>
        </>
    );
};

export default LoginForm;