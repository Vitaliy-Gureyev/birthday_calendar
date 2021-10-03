import {IUser} from "../../../models/IUser";
import {EventActionEnum, SetEventAction, SetGuestAction} from "./types";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import {api} from "../../../api/api";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        const response = await api.getUsers()
        dispatch(EventActionCreators.setGuests(response.data))
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreators.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(e => e.author === username || e.guest === username)
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e) {
            console.log(e)
        }
    }
}