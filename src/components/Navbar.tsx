import React, {FC} from 'react';
import {Layout, Menu, MenuProps} from "antd";
import {useNavigate} from 'react-router-dom'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

export const Navbar: FC = () => {
    const navigate = useNavigate()
    const {isAuth, user} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions()
    const items: MenuProps['items'] = isAuth
        ? [
            {
                label: user.username,
                key: 'user',
            },
            {
                label: 'Logout',
                key: 'logout',
                onClick: logout
            }
        ] : [
            {
                label: 'Login',
                key: 'login',
                onClick: () => navigate('/login')
            }
        ]
    return (
        <Layout.Header>
            <Menu theme="dark" mode="horizontal" items={items} />
        </Layout.Header>
    );
};
