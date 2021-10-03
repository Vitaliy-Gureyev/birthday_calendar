import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";

const getUsers = (): Promise<AxiosResponse<IUser[]>> => {
    try {
        return axios.get<IUser[]>('./users.json');
    } catch (error: any) {
        return error.message;
    }
};

export const api = {
    getUsers
}