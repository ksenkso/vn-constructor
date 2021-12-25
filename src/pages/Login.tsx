import React from 'react';
import {Button, Form, Input} from "antd";
import {api} from "../hooks/api";
import {setAuthTokens} from "axios-jwt";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    function onFinish(values: any) {
        console.log(values)
        api.post('/auth/login', values)
            .then(response => {
                setAuthTokens(response.data)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    function onFinishFailed(errors: any) {
        console.log(errors)
    }

    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {required: true, message: 'Please input your username'}
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {required: true, message: 'Please input your password'}
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    )
}
