import {Moment} from "moment";

export interface IEventFormData {
    description: string,
    guest: string
    date: Moment | null
}

export interface IAuthFormData {
    password: string,
    username: string,
    remember: boolean | undefined
}