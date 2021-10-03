import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from '../models/IEvent';
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypeSelector} from "../hooks/useTypeSelector";

interface EventFormProps {
    guests: IUser[]
    submit: (event: IEvent) => void
}

const NewEventForm: FC<EventFormProps> = ({guests, submit}) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const {user} = useTypeSelector(state => state.authReducer)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label='Event description'
                name='description'
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label='Event date'
                name='date'
                rules={[rules.required(), rules.isDateAfter('cannot select a past date')]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}

                />
            </Form.Item>
            <Form.Item
                label='Guest'
                name='guest'
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify={'end'}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create event
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default NewEventForm;