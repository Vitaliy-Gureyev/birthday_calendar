import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";


const HeaderNavbarComponent: FC = () => {
    const router = useHistory()
    const {isAuth, user} = useTypeSelector(state => state.authReducer)
    const {logout} = useActions()
    console.log(user)

    return (
        <Layout.Header style={{justifyContent: "end"}}>
            <Row justify="end">
                {isAuth ?
                    <>
                        <div style={{color: "white"}}>{user.username}</div>
                        <Menu theme='dark' mode='horizontal' selectable={false}>
                            <Menu.Item
                                onClick={() => logout()}
                                key={1}
                            >
                                Log out
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme='dark' mode='horizontal' selectable={false}>
                        <Menu.Item
                            onClick={() => router.push(RouteNames.LOGIN)}
                            key={1}
                        >
                            Login
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default HeaderNavbarComponent;