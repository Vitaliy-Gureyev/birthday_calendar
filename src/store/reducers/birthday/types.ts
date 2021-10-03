import {IBirthday} from "../../../models/IBirthday";

export interface BirthdayState {
    birthdays: IBirthday[];
}

export enum BirthdayActionEnum {
    SET_BIRTHDAYS = 'SET_BIRTHDAYS'
}

export interface setBirthdayAction {
    type: BirthdayActionEnum.SET_BIRTHDAYS
    payload: IBirthday[]
}

export type birthdayAction =
    setBirthdayAction