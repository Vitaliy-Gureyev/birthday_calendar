import {IBirthday} from "../../../models/IBirthday";
import {BirthdayActionEnum, setBirthdayAction} from "./types";
import {AppDispatch} from "../../index";


export const birthdayActionCreators = {
    setBirthdays: (payload: IBirthday[]): setBirthdayAction => ({type: BirthdayActionEnum.SET_BIRTHDAYS, payload}),
    createBirthday: (birthday: IBirthday) => async (dispatch: AppDispatch) => {
        try {
            const birthdays = localStorage.getItem('birthdays') || '[]'
            const json = JSON.parse(birthdays) as IBirthday[]
            json.push(birthday)
            dispatch(birthdayActionCreators.setBirthdays(json))
            localStorage.setItem('birthdays', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }

    },
    fetchBirthday: (username:string) => async (dispatch:AppDispatch) =>{
        try {
            const birthdays = localStorage.getItem('birthdays') || '[]'
            const json = JSON.parse(birthdays) as IBirthday[]
            const currentUserBirthdays = json.filter(e => e.author === username)
            dispatch(birthdayActionCreators.setBirthdays(currentUserBirthdays))
        }catch (e) {
            console.log(e)
        }
    }
}