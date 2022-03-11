import React, { useRef, forwardRef, useImperativeHandle, useState, Ref, useEffect } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

import Color from '../../constants/Color';

const CodeInputContainer = styled.View`
    width: 100%;
    flex-direction: row;
`
const Input = styled.TextInput<{error?: boolean, isFocused?: boolean, ref?: any}>`
    height: 56px;
    width: 48px;
    border-radius: 12px;
    border-width: ${props => props.isFocused ? '2px' : '1px'};
    border-color: ${props => props.isFocused ? Color.line.primarySoft : Color.line.soft};
    text-align: center;
    justify-content: center;
    margin-right: 4px;
    font-family: 'Poppins-SemiBold';
    font-size: 18px;
    text-align: center;
    color: ${Color.text.full};
`

const CodeInput = forwardRef((props: Props, ref: Ref<InputCodeRef>) =>{

    const [ input1Value, setInput1Value ] = useState<string | undefined>(undefined);
    const [ input2Value, setInput2Value ] = useState<string | undefined>(undefined);
    const [ input3Value, setInput3Value ] = useState<string | undefined>(undefined);
    const [ input4Value, setInput4Value ] = useState<string | undefined>(undefined);
    const [ input5Value, setInput5Value ] = useState<string | undefined>(undefined);
    const [ input6Value, setInput6Value ] = useState<string | undefined>(undefined);
    const [ code, setCode ] = useState<string | undefined>(undefined);

    const input1 = useRef<TextInput>();
    const input2 = useRef<TextInput>();
    const input3 = useRef<TextInput>();
    const input4 = useRef<TextInput>();
    const input5 = useRef<TextInput>();
    const input6 = useRef<TextInput>();

    const [ isFocused1, setIsFocused1 ] = useState<boolean>(false);
    const [ isFocused2, setIsFocused2 ] = useState<boolean>(false);
    const [ isFocused3, setIsFocused3 ] = useState<boolean>(false);
    const [ isFocused4, setIsFocused4 ] = useState<boolean>(false);
    const [ isFocused5, setIsFocused5 ] = useState<boolean>(false);
    const [ isFocused6, setIsFocused6 ] = useState<boolean>(false);

    const placeholder='-'
    const keyboardType='number-pad'

    useEffect(() =>{
        setIsFocused1(true);
    },[]);

    useImperativeHandle(ref, () => ({
        focus() {
            input1.current?.focus();
            setIsFocused1(true);
        },
        blur(){
            dismissKeyboard();
        },
        clean(){
            cleanInput();
        }
    }));

    const onInputChange = (value: string, input: number) =>{
        if(value && value.length === 6){
            pasteCode(value);
        }
        else{
            if(input === 1){
                setCode(value);
                setInput1Value(value);
                input2.current?.focus();
                setIsFocused2(true);
            }
            else if(input === 2){
                setCode(code+value);
                setInput2Value(value);
                input3.current?.focus();
                setIsFocused3(true);
            }
            else if(input === 3){
                setCode(code+value);
                setInput3Value(value);
                input4.current?.focus();
                setIsFocused4(true);        
            }
            else if(input === 4){
                setCode(code+value);
                setInput4Value(value);
                input5.current?.focus();
                setIsFocused5(true);        
            }
            else if(input === 5){
                setCode(code+value);
                setInput5Value(value);
                input6.current?.focus();
                setIsFocused6(true);
            }
            else if(input === 6){
                setCode(code+value);
                setInput6Value(value);
                input6.current?.blur();
                props.onChange && props.onChange(code+value);
            }
        }
    }

    const pasteCode = (code: string) =>{
        setCode(code);
        setInput1Value(code.charAt(0));
        setInput2Value(code.charAt(1));
        setInput3Value(code.charAt(2));
        setInput4Value(code.charAt(3));
        setInput5Value(code.charAt(4));
        setInput6Value(code.charAt(5));
        dismissKeyboard();
        props.onChange && props.onChange(code);
    }

    const dismissKeyboard = () =>{
        input1.current?.blur();
        input2.current?.blur();
        input3.current?.blur();
        input4.current?.blur();
        input5.current?.blur();
        input6.current?.blur();
    }

    const onInputKeyPress = ({nativeEvent}) =>{
        if(nativeEvent.key === 'Backspace'){
            cleanInput();
        }
    }

    const cleanInput = () =>{
        setCode(undefined);
        setInput1Value(undefined);
        setInput2Value(undefined);
        setIsFocused2(false);
        setInput3Value(undefined);
        setIsFocused3(false);
        setInput4Value(undefined);
        setIsFocused4(false);
        setInput5Value(undefined);
        setIsFocused5(false);
        setInput6Value(undefined);
        setIsFocused6(false);
        input1.current?.focus();
    }

    return(
        <CodeInputContainer
            style={props.style}
        >
            <Input
                ref={input1}
                onChangeText={(value) => onInputChange(value, 1)}
                onKeyPress={onInputKeyPress}
                error={props.error}
                selectionColor={'transparent'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={input1Value}
                maxLength={1}
                autoFocus={true}
                isFocused={isFocused1}
            />
            <Input
                ref={input2}
                onChangeText={(value) => onInputChange(value, 2)}
                onKeyPress={onInputKeyPress}
                error={props.error}
                selectionColor={'transparent'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={input2Value}
                maxLength={1}
                isFocused={isFocused2}
            />
            <Input
                ref={input3}
                onChangeText={(value) => onInputChange(value, 3)}
                onKeyPress={onInputKeyPress}
                error={props.error}
                selectionColor={'transparent'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={input3Value}
                maxLength={1}
                isFocused={isFocused3}
            />
            <Input
                ref={input4}
                onChangeText={(value) => onInputChange(value, 4)}
                onKeyPress={onInputKeyPress}
                error={props.error}
                selectionColor={'transparent'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={input4Value}
                maxLength={1}
                isFocused={isFocused4}
            />
            <Input
                ref={input5}
                onChangeText={(value) => onInputChange(value, 5)}
                onKeyPress={onInputKeyPress}
                error={props.error}
                selectionColor={'transparent'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={input5Value}
                maxLength={1}
                isFocused={isFocused5}
            />
            <Input
                ref={input6}
                onChangeText={(value) => onInputChange(value, 6)}
                onKeyPress={onInputKeyPress}
                error={props.error}
                selectionColor={'transparent'}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={input6Value}
                maxLength={1}
                isFocused={isFocused6}
            />
        </CodeInputContainer>
    )
});
export default CodeInput;
export interface Props{
    ref?: any,
    onChange?: Function,
    error?: boolean
    autoFocus?: boolean,
    style?: Object
}
export interface InputCodeRef{
    focus: () => void,
    blur: () => void
    clean: () => void
}