import React, { FC, useState, useRef } from 'react';
import { TextInput } from 'react-native';

import SelectCountry from '../Select/SelectCountry';
import Input from '../Input/Input';

const PhoneInput = (props: Props) =>{

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
            placeholder={props.translation ? props.translation?.input_phone_phone : 'Teléfono'}
            maxLength={10}
            autoComplete={'tel'}
            keyboardType={'number-pad'}
            error={props.error}
            ref={input}
        >
            <SelectCountry
                translation={props.translation}
                countries={props.countries}
                locale={props.locale}
                modalProps={{
                    title: props.translation ? props.translation?.input_phone_phone_prefix : 'Prefijo telefónico',
                    showSearch: true
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
    countries: Array<{
        id: string,
        prefix: string,
        esCountry: string,
        enCountry: string,
        esPrefix: string,
        enPrefix: string,
        icon?: any
    }>,
    locale: string,
    value?: string,
    error?: boolean,
    onCountryChange?: Function,
    onChangeText?: Function
}