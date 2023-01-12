import React, { FC, useState } from 'react';
import { ViewStyle } from 'react-native';
import { Calendar } from 'lucide-react-native';
import Input from './Input';

const DateInput = (props: Props) =>{

    const [ day, setDay ] = useState<number | undefined>(undefined);
    const [ month, setMonth ] = useState<number | undefined>(undefined);
    const [ dateError, setDateError ] = useState(false);
    const [ dateInputValue, setDateInputValue ] = useState('');

    const onDateChange = text =>{
        //Check if is removing or writing
        if(month && month > 12) setDateError(true);
        else setDateError(false);
        if(text.length < dateInputValue.length){
            if(text.length === 2 || text.length === 5)
                setDateInputValue(text.slice(0, -1));
            else
                setDateInputValue(text);
        }
        else{
            if(text.length === 2) 
                setDay(text);
                if(text > 31) setDateError(true);
            else if(text.length === 5){
                const month = text.substring(3);
                setMonth(month);
                if(month > 12) setDateError(true);
            }
            else if(text.length === 10){
                const year = text.substring(6);
                if(month && day){
                    const date = new Date(year, month, day);
                    if(props.maximumDate && props.maximumDate < date) setDateError(true);
                    else if(props.minimumDate && props.minimumDate > date) setDateError(true);
                    else props.onChange && props.onChange({
                        day: day,
                        month: month,
                        year: year
                    });
                }
                else setDateError(true);
            }
            
            if(text.length === 2)
                setDateInputValue(text+'/');
            else if(text.length === 5)
                setDateInputValue(text+'/')
            else
                setDateInputValue(text);
        }
    }

    return(
        <Input
            style={props.style}
            icon={Calendar}
            onChangeText={onDateChange}
            keyboardType={'number-pad'}
            value={dateInputValue}
            error={dateError ? dateError : props.error}
            maxLength={10}
            placeholder={props.placeholder}
        />
    )
}
export default DateInput;
export interface Props{
    style?: ViewStyle,
    error?: boolean,
    onChange?: Function,
    maximumDate?: Date,
    minimumDate?: Date,
    placeholder?: string
}