import React, { useState, forwardRef, useImperativeHandle, useRef, Ref } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceDetail, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { Search } from 'react-native-lucide';
import Color from '../../constants/Color';
import Modal from '../Modal/Modal';
import Input from './InputFalse';
import { View } from 'react-native';

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
            placeholder={props.placeholder}
            value={address}
            error={props.error}
        />
        <Modal
            translation={props.translation}
            visible={showModal}
            title={props.translation ? props.translation.sign_up_city_modal_title : 'Busca tu ciudad'}
            orientation={'fullScreen'}
            onDismiss={onDismiss}
            showTopClose={true}
            showBottomClose={false}
        >
            <GooglePlacesAutocomplete    
                ref={input}
                query={{
                    key: props.apiMapsKey,
                    language: props.currentLocale,
                }}
                placeholder={props.translation ? props.translation.sign_up_city_modal_search : 'Buscar'}
                onPress={(data, details = null) => {
                    onAddressPress(data, details);
                }}
                keyboardShouldPersistTaps='always'
                textInputProps={{
                    autoFocus: true,
                    onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocused(false),
                    clearButtonMode: 'while-editing',
                    autoCorrect: false
                }}
                renderLeftButton={() => <View style={{justifyContent: 'center', paddingLeft: 6}}><Search height={20} width={20} color={Color.text.full}/></View>}
                styles={{
                    textInputContainer:{
                        height: 48,
                        borderColor: Color.line.low,
                        borderWidth: 1,
                        borderRadius: 100,
                        paddingRight: 8,
                        paddingLeft: 8,
                        backgroundColor: Color.background.soft,
                        marginTop: 16
                    },
                    textInput:{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: undefined,
                        fontSize: 15,
                        color: Color.text.full
                    },
                    description:{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        color: Color.text.full
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
    translation:{
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