import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import {Calendar} from "../components/Calendar";
import {EventForm} from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEventFormData} from "../models/IForm";
import {formatDate} from "../utils/date";

export const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.eventReducer)
    const {user} = useTypedSelector(state => state.authReducer)


    const submit = (event: IEventFormData) => {
        createEvent({
            description: event.description,
            date: formatDate(event.date),
            author: user.username,
            guest: event.guest
        })
        setModalVisible(false)
    }

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    return (
        <Layout>
            <Calendar events={events} />
            <Row justify={"center"}>
                <Button onClick={() => setModalVisible(true)}>Add Event</Button>
            </Row>
            <Modal title="Add Event" open={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                <EventForm guests={guests} submit={submit}/>
            </Modal>
        </Layout>
    );
};
