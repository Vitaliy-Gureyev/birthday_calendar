import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {IBirthday} from "../models/IBirthday";

interface CalendarProps {
    events: IEvent[]
    birthdays: IBirthday[]
}

const CalendarComponent: FC<CalendarProps> = ({events, birthdays}) => {

    const dateCellRender = (value: Moment) => {
        const formattedDate = formatDate(value.toDate())
        const currentDayEvent = events.filter(e => e.date === formattedDate)
        const currentDayBirthday = birthdays.filter(e => e.date === formattedDate)
        console.log(birthdays)
        return (
            <div>
                {currentDayEvent.map((e, index) =>
                    <div key={index}>
                        {e.description}
                    </div>)}
                {currentDayBirthday.map((e, index) =>
                    <div key={index}>
                        🎂{e.birthdayPersonName}<br/>
                        {e.description}
                    </div>
                )}
            </div>
        )
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default CalendarComponent;