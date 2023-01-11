import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import SelectCountry from '../Select/SelectCountry';
import Input from '../Input/Input';

const PhoneInput = (props: Props) =>{

    const input = useRef<TextInput>(null);

    const onCountryChange = (country: {prefix: string}) =>{
        props.onCountryChange && props.onCountryChange(country);
    }

    const onSelectShow = () =>{
        input.current?.blur();
    }

    const onSelectDismiss = () =>{
        input.current?.focus();
    }

    return(
        <Input
            {...props}
            placeholder={props.placeholder ? props.placeholder : 'Número de teléfono'}
            autoComplete={'tel'}
            keyboardType={'number-pad'}
            error={props.error}
            ref={input}
            style={props.style}
            hideTitle={true}
        >
            <SelectCountry
                style={{height: '100%', marginRight: 12}}
                countries={props.countries}
                locale={props.locale}
                modalProps={{
                    title: props.modalTitle ? props.modalTitle : 'Prefijo telefónico',
                    showSearch: true
                }}
                defaultCountry={props.defaultCountry}
                onChange={onCountryChange}
                onShow={onSelectShow}
                onDismiss={onSelectDismiss}
            />
        </Input>
    )
}
export default PhoneInput;
export interface Props{
    countries: Array<{
        id: string,
        prefix: string,
        esCountry: string,
        enCountry: string,
        countryCode: string
    }>,
    locale: string,
    value?: string,
    error?: boolean,
    style?: Object,
    placeholder?: string,
    modalTitle?: string,
    defaultCountry?: string,
    onCountryChange?: (country: { prefix: string }) => void,
    onChangeText?: (phone: string) => void,
}