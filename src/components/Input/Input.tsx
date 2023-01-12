import React, { useState, forwardRef, useImperativeHandle, useRef, Ref } from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps, ViewStyle, Animated } from 'react-native';
import Color from '../../constants/Color';
import TextAnimated from '../Text/TextAnimated';
import Text from '../Text/Text';

const Container = styled.View<{error?: boolean, isFocused: boolean | undefined}>`
    height: 56px;
    border-color: ${props => props.error ? Color.status.color.error : props.isFocused ? Color.line.full : Color.line.soft};
    border-width: ${props => props.error || props.isFocused ? '2px' : '1px'};
    border-radius: 12px;
    align-items: center;
    flex-direction: row;
    padding: 0px 16px;
    background-color: ${Color.background.neutral};
`
const InputStyled = styled.TextInput<{isFocused: boolean | undefined, hasValue: boolean, hideTitle?: boolean}>`
    flex: 1;
    font-size: 15px;
    font-family: 'Poppins-Regular';
    height: ${props => props.isFocused ? '30px' : '54px'};
    padding: 0px;
    color: ${Color.text.primaryBlack};
    margin-top: ${props => (props.isFocused && !props.hideTitle) ? '18px' : '0px'};
`
const IconView = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 12px;
`
const Row = styled.View`
    flex-direction: row;
`
const Placeholder = styled(TextAnimated)<{icon: boolean}>`
    position: absolute;
    color: ${Color.text.high};
    left: 0px;
    right: 0px;
    line-height: 22px;
`
const InputContainer = styled.View`
    position: relative;
    flex: 1;
    height: 100%;
    justify-content: center;
`

const Input = forwardRef((props: Props, ref: Ref<InputRef>) =>{

    const input = useRef<TextInput>();
    const fontSizeAnim = useRef(new Animated.Value(16)).current;
    const topAnim = useRef(new Animated.Value(16)).current;

    const [ isFocused, setIsFocused ] = useState<boolean>(false);
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

    const onFocus = (e) =>{
        setIsFocused(true);
        Animated.timing(fontSizeAnim, {
            toValue: 12,
            duration: 300,
            useNativeDriver: false
        }).start();
        Animated.timing(topAnim, {
            toValue: 5,
            duration: 300,
            useNativeDriver: false
        }).start();
        props.onFocus && props.onFocus(e);
    }

    const onBlur = (e) =>{
        setIsFocused(false);
        if(!value){
            Animated.timing(fontSizeAnim, {
                toValue: 16,
                duration: 300,
                useNativeDriver: false
            }).start();
            Animated.timing(topAnim, {
                toValue: 16,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
        props.onBlur && props.onBlur(e);
    }

    const onChangeText = (text) => {
        if(text && text.length > 0) {
            setValue(text);
        } else {
            setValue(undefined);
        }
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
                    <props.icon color={props.error ? Color.status.color.error : Color.text.primaryBlack}/>
                </IconView>
            }
            {children}
            <InputContainer>
                <Placeholder
                    type='other'
                    icon={props.icon ? true : false}
                    style={{
                        fontSize: fontSizeAnim,
                        top: topAnim,
                        display: props.hideTitle ? (isFocused ? 'none' : 'flex') : 'flex'
                    }}
                >
                    {props.placeholder}
                </Placeholder>
                <Row>
                    <InputStyled
                        ref={input}
                        caretHidden={true}
                        selectionColor={Color.text.primary}
                        isFocused={(isFocused || value) ? true : false}
                        hasValue={value ? true : false}
                        hideTitle={props.hideTitle}
                        {...rest}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChangeText={onChangeText}
                        placeholder={''}
                    />
                    {props.currency &&
                        <Text
                            type='h4'
                            weight='regular'
                        >
                            {props.currency}
                        </Text>
                    }
                </Row>
            </InputContainer>
        </Container>
    )
});
export default Input;
export interface Props extends TextInputProps{
    error?: boolean,
    icon?: any,
    style?: ViewStyle,
    onFocus?: any,
    children?: any,
    hideTitle?: boolean,
    currency?: string
}
export interface InputRef{
    focus: () => void,
    blur: () => void
}