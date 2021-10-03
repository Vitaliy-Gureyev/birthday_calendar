import React from "react";
import LoginPage from "../pages/LoginPage";
import EventPage from "../pages/EventPage";

export interface IRoute {
    path: string
    component: React.ComponentType
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: LoginPage}
]

export const privatRoutes: IRoute[] = [
    {path: RouteNames.EVENT, exact: true, component: EventPage}
]