import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {EventActionEnum, setEventsAction, setGuestsAction} from "./types";
import {AppDispatch} from "../../index";
import UserService from "../../../api/userService";

export const EventActionCreator = {
    setGuests: (payload: IUser[]): setGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): setEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const guests = await UserService.getUsers()
            dispatch(EventActionCreator.setGuests(guests.data))
        } catch (e) {

        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const parsedEvents = JSON.parse(events) as IEvent[]
            parsedEvents.push(event)
            dispatch(EventActionCreator.setEvents(parsedEvents))
            localStorage.setItem('events', JSON.stringify(parsedEvents))
        } catch (e) {

        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        const events = localStorage.getItem('events') || '[]'
        const parsedEvents = JSON.parse(events) as IEvent[]
        const filteredEvents = parsedEvents.filter((event) => event.author === username || event.guest === username)
        dispatch(EventActionCreator.setEvents(filteredEvents))
    }
}