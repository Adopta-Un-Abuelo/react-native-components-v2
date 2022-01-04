import React, { FC, useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.View<{error?: boolean, isFocused: boolean | undefined}>`
    height: 64px;
    border-color: ${props => props.error ? Color.error : (props.isFocused ? Color.gray3 : 'transparent')};
    border-width: 1px;
    border-radius: 24px;
    align-items: center;
    flex-direction: row;
    padding: 0px 24px;
    background-color: ${props => props.isFocused ? 'white' : Color.gray6};
`
const InputStyled = styled.TextInput<{isFocused: boolean | undefined, hasValue: boolean}>`
    flex: 1;
    font-size: 16px;
    font-family: 'Poppins-Regular';
    height: 100%;
    padding: 0px;
    color: ${Color.gray2};
    margin-top: ${props => (props.isFocused || props.hasValue) ? 18+'px' : 0+'px'};
`
const IconView = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 12px;
`
const InputView = styled.View`
    flex: 1;
`

const Input: FC<Props> = forwardRef((props, ref) =>{

    const input = useRef<TextInput>();
    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ currentPlaceholder, setCurrentPlaceholder ] = useState<string | undefined>(props.placeholder);
    const [ value, setValue ] = useState<string | undefined>(undefined);
    const { children, style, error, icon, ...rest } = props;

    useImperativeHandle(ref, () => ({
        focus(){
            input.current?.focus();
        },
        blur(){
            input.current?.blur();
        }
    }));

    useEffect(() =>{
        setCurrentPlaceholder(props.placeholder);
    },[props.placeholder]);

    const onFocus = () =>{
        setIsFocused(true);
        setCurrentPlaceholder(undefined);
        props.onFocus && props.onFocus();
    }

    const onBlur = () =>{
        setIsFocused(false);
        setCurrentPlaceholder(props.placeholder);
        props.onBlur && props.onBlur();
    }

    const onChangeText = text =>{
        if(text && text.length > 0) setValue(text);
        else setValue(undefined);
        props.onChangeText && props.onChangeText(text);
    }

    return(
        <Container
            style={style}
            error={props.error}
            isFocused={isFocused}
        >
            {props.icon &&
                <IconView>
                    <props.icon stroke={props.error ? Color.error : Color.blue3}/>
                </IconView>
            }
            {children}
            <InputView>
                {(!currentPlaceholder || value) &&
                    <Text
                        style={{position: 'absolute', top: 10, fontSize: 14, color: Color.gray4}}
                    >
                        {props.placeholder}
                    </Text>
                }
                <InputStyled
                    ref={input}
                    caretHidden={true}
                    selectionColor={Color.blue3}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={currentPlaceholder}
                    onChangeText={onChangeText}
                    isFocused={isFocused}
                    hasValue={value ? true : false}
                    placeholderTextColor={Color.gray4}
                    maxLength={props.maxLength}
                    keyboardType={props.keyboardType}
                    {...rest}
                />
            </InputView>
        </Container>
    )
});
export default Input;
export interface Props{
    ref?: any,
    error?: boolean,
    icon?: any,
    style?: ViewStyle,
    onFocus?: any,
    onBlur?: any,
    placeholder?: string,
    onChangeText?: any,
    maxLength?: number,
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'phone-pad' | 'numeric' | 'email-address',
    blurOnSubmit?: boolean,
    clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always',
    value?: string
}