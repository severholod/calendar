import React, {FC} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEventFormData} from "../models/IForm";
import dayjs, {Dayjs} from "dayjs";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEventFormData) => void
}
const initialValues: IEventFormData = {
    date: null,
    description: '',
    guest: ''
}

export const EventForm: FC<EventFormProps> = ({guests, submit}) => {
    const disableBeforeDate = (date: Dayjs) => {
        const currentDate = dayjs().date()
        const currentMonth = dayjs().month()
        return date.month() <= currentMonth && date.date() < currentDate
    }
    return (
        <Form
            onFinish={submit}
            initialValues={initialValues}
        >
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required()]}
            >
                <DatePicker
                    disabledDate={disableBeforeDate}/>
            </Form.Item>

            <Form.Item
                label="Select guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select style={{width: 120}} options={guests.map((guest) => ({value: guest.username, label: guest.username}))}/>
            </Form.Item>

            <Row justify={"end"}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size={"large"}>
                        Add
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};
