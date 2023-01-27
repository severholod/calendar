import {Moment} from "moment";

export const formatDate = (date: Moment | null): string => {
    if (!date) return ''
    return date.format('MMMM Do YYYY')
}