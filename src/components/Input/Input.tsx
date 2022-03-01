import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, Ref } from 'react';
import styled from 'styled-components/native';
import { TextInput, ViewStyle } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.View<{error?: boolean, isFocused: boolean | undefined}>`
    height: 56px;
    border-color: ${props => props.error ? Color.error : (props.isFocused ? '#D4D6F6' : Color.gray5)};
    border-width: ${props => props.isFocused || props.error ? '2px' : '1px'};
    border-radius: 12px;
    align-items: center;
    flex-direction: row;
    padding: 0px 16px;
    background-color: white;
`
const InputStyled = styled.TextInput<{isFocused: boolean | undefined, hasValue: boolean, hideTitle?: boolean}>`
    flex: 1;
    font-size: 16px;
    font-family: 'Poppins-Regular';
    height: 100%;
    padding: 0px;
    color: ${Color.black};
    margin-top: ${props => ((props.isFocused || props.hasValue) && !props.hideTitle) ? '18px' : '0px'};
`
const IconView = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 12px;
`
const InputView = styled.View`
    flex: 1;
`

const InputComponent = forwardRef((props: Props, ref: Ref<InputRef>) =>{

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
                    <props.icon color={props.error ? Color.error : Color.blue3}/>
                </IconView>
            }
            {children}
            <InputView>
                {((!currentPlaceholder || value) && !props.hideTitle) &&
                    <Text
                        type='c1'
                        style={{position: 'absolute', top: 8, color: Color.gray3}}
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
                    placeholderTextColor={Color.gray3}
                    maxLength={props.maxLength}
                    keyboardType={props.keyboardType}
                    {...rest}
                />
            </InputView>
        </Container>
    )
});
export default InputComponent;
export interface Props{
    id?: string,
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
    value?: string,
    autoComplete?: string
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    autoCorrent?: boolean
    children?: any,
    hideTitle?: boolean,
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
}
export interface InputRef{
    focus: () => void,
    blur: () => void
}