import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privatRoutes, publicRoutes, RouteNames} from "../routes";
import {useTypeSelector} from "../hooks/useTypeSelector";

const AppRouterComponent = () => {
    const isAuth = useTypeSelector(state => state.authReducer.isAuth)
    return (
        isAuth ?
            <Switch>
                {privatRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.EVENT}/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>

    );
};

export default AppRouterComponent;