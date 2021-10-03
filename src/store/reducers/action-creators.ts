import {AuthActionCreator} from "./auth/action-creators";
import {EventActionCreators} from "./event/action-creators";
import {birthdayActionCreators} from "./birthday/action-creators";

export const allActionCreators = {
    ...AuthActionCreator,
    ...EventActionCreators,
    ...birthdayActionCreators
}