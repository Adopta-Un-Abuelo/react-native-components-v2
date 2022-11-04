import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import InputFalse from './InputFalse';
import Modal from '../Modal/Modal'

const DateInput = (props: Props) =>{

    const [ showModal, setShowModal ] = useState(false);
    const [ dateInputValue, setDateInputValue ] = useState<string | undefined>(undefined);
    const [ selectedDate, setSelectedDate ] = useState(new Date());

    const onDateChange = date =>{
        setSelectedDate(date);
    }

    const onInputFocus = () =>{
        setShowModal(true);
    }

    const onSave = () =>{        
        const temp = new Intl.DateTimeFormat(props.currentLocale, {month: '2-digit', day: '2-digit', year: '2-digit'}).format(selectedDate);
        setDateInputValue(temp);
        setShowModal(false);
        props.onChange && props.onChange(selectedDate)
    }

    return(
        <>
            <Modal
                visible={showModal}
                orientation={'bottom'}
                buttonProps={{
                    title: props.saveString ? props.saveString : 'Guardar',
                    onPress: onSave
                }}
                onDismiss={() => setShowModal(false)}
            >
                <DatePicker
                    date={selectedDate}
                    mode={props.mode}
                    minimumDate={props.minimumDate}
                    maximumDate={props.maximumDate}
                    androidVariant={'iosClone'}
                    onDateChange={onDateChange}
                    locale={props.currentLocale}
                />
            </Modal>
            <InputFalse
                style={props.style}
                value={dateInputValue}
                placeholder={props.placeholder}
                onPress={onInputFocus}
            />
        </>
    )
}
export default DateInput;
export interface Props{
    currentLocale: string,
    style?: Object,
    error?: boolean,
    onChange?: Function,
    maximumDate?: Date,
    minimumDate?: Date,
    mode?: 'date' | 'datetime' | 'time',
    placeholder?: string,
    saveString?: string
}