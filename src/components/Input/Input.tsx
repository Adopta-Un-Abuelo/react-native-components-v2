import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, Ref } from 'react';
import styled from 'styled-components/native';
import { TextInput, ViewStyle } from 'react-native';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.View<{error?: boolean, isFocused: boolean | undefined, type?: string}>`
    height: ${props => props.type === 'small' ? '48px' : props.type === 'big' ? undefined : '56px'};
    min-height: ${props => props.type === 'big' ? '160px' : '0px'};
    border-color: ${props => props.error ? Color.status.color.error : props.isFocused ? Color.line.full : Color.line.soft};
    border-width: ${props => props.type === 'small' ? '0px' : (props.error || props.isFocused ? '2px' : '1px')};
    border-radius: 12px;
    align-items: ${props => props.type === 'big' ? undefined : 'center'};
    flex-direction: row;
    padding: 0px 16px;
    padding-top: ${props => props.type === 'big' ? '16px' : '0px'};
    padding-bottom: ${props => props.type === 'big' ? '16px' : '0px'};
    background-color: ${props => props.type === 'small' ? Color.background.soft : Color.background.neutral};
`
const InputStyled = styled.TextInput<{isFocused: boolean | undefined, hasValue: boolean, hideTitle?: boolean}>`
    flex: 1;
    font-size: 15px;
    font-family: 'Poppins-Regular';
    height: 100%;
    padding: 0px;
    color: ${Color.text.primaryBlack};
    margin-top: ${props => ((props.isFocused || props.hasValue) && !props.hideTitle) ? '10px' : '0px'};
`
const IconView = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 12px;
`
const InputView = styled.View`
    flex: 1;
`
const Row = styled.View`
    flex-direction: row;
`
const Column = styled.View`
`

const Input = forwardRef((props: Props, ref: Ref<InputRef>) =>{

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

    const onChangeText = (text) => {
        if(text && text.length > 0) 
            setValue(text);
        else 
            setValue(undefined);
        // setChars((1000 - text.length).toString());
        props.onChangeText && props.onChangeText(text);
    }

    return(
        <Column>
            <Container
                style={style}
                error={props.error}
                isFocused={isFocused}
                type={props.type}
            >
                {props.icon &&
                    <IconView>
                        <props.icon color={props.error ? Color.status.color.error : Color.text.primaryBlack}/>
                    </IconView>
                }
                {children}
                <InputView>
                    {((!currentPlaceholder || value) && !props.hideTitle) &&
                        <Text
                            type='c2'
                            style={{position: 'absolute', color: Color.text.high}}
                        >
                            {props.placeholder}
                        </Text>
                    }
                    <Row>
                        <InputStyled
                            ref={input}
                            caretHidden={true}
                            selectionColor={Color.text.primary}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            placeholder={currentPlaceholder}
                            onChangeText={onChangeText}
                            isFocused={isFocused}
                            hasValue={value ? true : false}
                            placeholderTextColor={Color.text.high}
                            maxLength={props.maxLength}
                            keyboardType={props.keyboardType}
                            multiline={props.multiline}
                            {...rest}
                        />
                        {props.showEuro &&
                            <Text
                                type='h4'
                                weight='regular'
                            >
                                €
                            </Text>
                        }
                    </Row>
                </InputView>
            </Container>
            {/* {props.type === 'big' && 
                <Text
                    type='c1'
                    weight='regular'
                    style={{color: Color.text.high, marginLeft: 16, marginTop: 4}}
                >
                    /1000 caracteres
                </Text>
            } */}
        </Column>
    )
});
export default Input;
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
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
    type?: 'small' | 'big',
    multiline?: boolean,
    showEuro?: boolean
}
export interface InputRef{
    focus: () => void,
    blur: () => void
}