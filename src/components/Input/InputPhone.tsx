import React, { FC, useState, useRef } from 'react';
import { TextInput } from 'react-native';

import Select from '../Select/Select';
import Input from '../Input/Input';
import Country from '../../constants/Country';

const PhoneInput: FC<Props> = props =>{

    const input = useRef<TextInput>(null);
    const [ title, setTitle ] = useState('+34');

    const onCountryChange = (country: {phone: string}) =>{
        setTitle(country.phone);
        props.onCountryChange && props.onCountryChange(country.phone);
    }

    const onSelectShow = () =>{
        input.current?.blur();
    }

    const onSelectDismiss = () =>{
        input.current?.focus();
    }

    return(
        <Input
            id = "phoneInput"
            {...props}
            placeholder={props.translation?.input_phone_phone}
            maxLength={10}
            autoComplete={'tel'}
            keyboardType={'number-pad'}
            error={props.error}
            ref={input}
        >
            <Select
                style={{marginRight: 8}}
                selectStyle={{borderWidth: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0, backgroundColor: 'transparent'}}
                options={Country}
                titleValue={'title'}
                title={title}
                modalProps={{
                    title: props.translation?.input_phone_phone_prefix
                }}
                onChange={onCountryChange}
                onShow={onSelectShow}
                onDismiss={onSelectDismiss}
            />
        </Input>
    )
}
export default PhoneInput;
export interface Props{
    translation: {
		[key: string]: any
	},
    value?: string,
    onCountryChange?: Function,
    onChangeText?: Function,
    error?: boolean
}