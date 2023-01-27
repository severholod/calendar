import React, {FC} from 'react';
import {Calendar as AntCalendar} from 'antd'
import {IEvent} from "../models/IEvent";
import dayjs, {Dayjs} from "dayjs";

interface CalendarProps {
    events: IEvent[]
}

export const Calendar: FC<CalendarProps> = ({events}) => {
    const dateCellRender = (value: Dayjs) => {
        const formattedDate = value.format('MMMM Do YYYY')
        const currentEvents = events.filter((event) => event.date === formattedDate)
        return (
            <div>
                {currentEvents.map((event, idx) => <div key={idx}>{event.description}</div>)}
            </div>
        );
    };
    return (
        <AntCalendar dateCellRender={dateCellRender}/>
    );
};
