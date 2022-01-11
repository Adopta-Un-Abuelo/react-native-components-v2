import React, { useState, forwardRef, useImperativeHandle, useRef, Ref } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceDetail, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';

import Color from '../../constants/Color';
import Modal from '../Modal/Modal';
import Input from './InputFalse';
import { MapPin } from 'react-native-feather';

const PlaceInput = forwardRef((props: Props, ref: Ref<InputRef>) =>{

    const input = useRef<GooglePlacesAutocompleteRef>();
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ address, setAddress ] = useState<string | undefined>(undefined);
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        focus(){
            input.current?.focus();
        },
        blur(){
            input.current?.blur();
        }
    }));

    const onAddressPress = (data: {description: string}, details: GooglePlaceDetail | null) =>{
        setShowModal(false);
        setAddress(data.description);
        props.onChange && props.onChange(data, details);
    }

    const onInputFocus = () =>{
        setShowModal(true);
    }

    const onDismiss = () =>{
        setShowModal(false);
    }

    return (
        <>
        <Input
            onPress={onInputFocus}
            style={props.style}
            icon={MapPin}
            placeholder={props.placeholder}
            value={address}
        />
        <Modal
            title={props.translation ? props.translation.input_place_search_direction : 'Buscar localización'}
            visible={showModal}
            horientation={'fullScreen'}
            onDismiss={onDismiss}
        >
            <GooglePlacesAutocomplete    
                ref={input}
                query={{
                    key: props.apiMapsKey,
                    language: props.currentLocale,
                }}
                placeholder={props.placeholder ? props.placeholder : ''}
                onPress={(data, details = null) => {
                    onAddressPress(data, details);
                }}
                keyboardShouldPersistTaps='always'
                textInputProps={{
                    autoFocus: true,
                    onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocused(false),
                    selectionColor: Color.blue3,
                    clearButtonMode: 'while-editing',
                    autoCorrect: false
                }}
                styles={{
                    textInput:{
                        height: 64,
                        borderColor: props.error ? Color.error : (isFocused ? Color.gray3 : 'transparent'),
                        borderWidth: 1,
                        borderRadius: 24,
                        paddingRight: 24,
                        paddingLeft: 24,
                        backgroundColor: isFocused ? 'white' : Color.gray6,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        color: Color.gray2,
                        marginBottom: 0,
                        marginTop: 16
                    },
                    description:{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: Color.gray2
                    }
                }}
            />
        </Modal>
        </>
    );
});
export default PlaceInput;
export interface Props{
    apiMapsKey: string
    currentLocale: string,
    translation: {
		[key: string]: any
	},
    ref?: any,
    style: Object,
    onChange: Function,
    onFocus?: Function,
    onBlur?: Function,
    error?: boolean,
    placeholder?: string
}
export interface InputRef{
    focus: () => void,
    blur: () => void
}