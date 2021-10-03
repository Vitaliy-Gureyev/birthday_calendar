import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row} from "antd";
import {rules} from "../utils/rules";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {IBirthday} from "../models/IBirthday";

interface BirthdayFormProps {
    submit: (birthday: IBirthday) => void
}

const NewBirthdayForm: FC<BirthdayFormProps> = ({submit}) => {
    const {user} = useTypeSelector(state => state.authReducer)

    const [birthday, setBirthday] = useState<IBirthday>({
        authorId: '',
        birthdayPersonName: '',
        date: '',
        description: '',
    })

    const selectDate = (date: Moment | null) => {
        if (date) {
            setBirthday({...birthday, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        submit({...birthday, authorId: user.id})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label='Name'
                name='name'
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setBirthday({...birthday, birthdayPersonName: e.target.value})}
                    value={birthday.birthdayPersonName}
                />
            </Form.Item>
            <Form.Item
                label='Date of Birth'
                name='Date of Birth'
                rules={[rules.required()]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label='Description'
                name='description'
            >
                <Input
                    onChange={e => setBirthday({...birthday, description: e.target.value})}
                    value={birthday.description}
                />
            </Form.Item>
            <Row justify={'end'}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create birthday
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default NewBirthdayForm;