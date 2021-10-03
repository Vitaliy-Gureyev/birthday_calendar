import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";

export interface EventState {
    guests: IUser[];
    event: IEvent[]
}

export enum EventActionEnum {
    SET_GUESTS = 'SET_GUESTS',
    SET_EVENTS = 'SET_EVENTS',
}

export interface SetGuestAction {
    type: EventActionEnum.SET_GUESTS
    payload: IUser[]
}

export interface SetEventAction {
    type: EventActionEnum.SET_EVENTS
    payload: IEvent[]
}

export type EventAction =
    SetGuestAction |
    SetEventAction