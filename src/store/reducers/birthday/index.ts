import {BirthdayActionEnum, BirthdayState, setBirthdayAction} from "./types";

const initialState: BirthdayState = {
    birthdays: []
}

export default function birthdayReducer(state = initialState, action: setBirthdayAction): BirthdayState {
    switch (action.type){
        case BirthdayActionEnum.SET_BIRTHDAYS:
            return {...state, birthdays:action.payload}
        default:
            return state
    }
}

