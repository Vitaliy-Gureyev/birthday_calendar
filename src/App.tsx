import React, {FC, useEffect} from 'react';
import AppRouterComponent from "./components/AppRouterComponent";
import HeaderNavbarComponent from "./components/HeaderNavbarComponent";
import {Layout} from "antd";
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

const App: FC = () => {

    const {setUser, setIsAuth} = useActions()

    useEffect(()=> {
        if (localStorage.getItem('auth')) {
            setUser({username:localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true)
        }
    })

    return (
        <Layout>
            <HeaderNavbarComponent/>
            <Layout.Content>
                <AppRouterComponent/>
            </Layout.Content>
        </Layout>
    );
};

export default App;