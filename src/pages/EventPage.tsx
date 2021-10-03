import {Button, Layout, Modal, Row} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import CalendarComponent from "../components/CalendarComponent";
import NewEventForm from "../components/NewEventForm";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {IEvent} from "../models/IEvent";
import NewBirthDayForm from "../components/NewBirthDayForm";
import {IBirthday} from "../models/IBirthday";

const EventPage: FC = () => {
    const [modalNewEventVisible, setModalNewEventVisible] = useState(false)
    const [modalNewBirthdayVisible, setModalNewBirthdayVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents, createBirthday, fetchBirthday} = useActions()
    const {guests, event} = useTypeSelector(state => state.eventReducer)
    const {birthdays} = useTypeSelector(state => state.birthdayReducer)
    const {user} = useTypeSelector(state => state.authReducer)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
        fetchBirthday(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalNewEventVisible(false)
        createEvent(event)
    }

    const addNewBirthday = (birthday: IBirthday) => {
        setModalNewEventVisible(false)
        createBirthday(birthday)
    }

    return (
        <Layout>
            <CalendarComponent events={event} birthdays={birthdays}/>
            <Row justify='center'>
                <Button
                    onClick={() => setModalNewEventVisible(true)}
                >
                    Add event
                </Button>
                <Button
                    onClick={() => setModalNewBirthdayVisible(true)}
                >
                    Add birthday
                </Button>
            </Row>
            <Modal
                title='Add event'
                visible={modalNewEventVisible}
                footer={null}
                onCancel={() => setModalNewEventVisible(false)}
            >
                <NewEventForm
                    submit={addNewEvent}
                    guests={guests}
                />
            </Modal>
            <Modal
                title='Add birthday'
                visible={modalNewBirthdayVisible}
                footer={null}
                onCancel={() => setModalNewBirthdayVisible(false)}
            >
                <NewBirthDayForm submit={addNewBirthday}/>
            </Modal>
        </Layout>
    );
};

export default EventPage;