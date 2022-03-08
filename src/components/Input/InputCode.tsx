import React, { useRef, forwardRef, useImperativeHandle, useState, Ref } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';

const CodeInputContainer = styled.View`
    width: 100%;
    flex-direction: row;
`
const InputContainer = styled.View`
    height: 56px;
    width: 48px;
    border-radius: 12px;
    border-width: 1px;
    border-color: ${Color.gray5};
    text-align: center;
    justify-content: center;
    margin-right: 4px;
`
const Input = styled.TextInput<{error?: boolean, ref?: any}>`
    font-family: 'Poppins-SemiBold';
    font-size: 18px;
    text-align: center;
    color: ${Color.blue3};
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

    const placeholder='-'
    const keyboardType='number-pad'

    useImperativeHandle(ref, () => ({
        focus() {
            input1.current?.focus();
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
            }
            else if(input === 2){
                setCode(code+value);
                setInput2Value(value);
                input3.current?.focus();
            }
            else if(input === 3){
                setCode(code+value);
                setInput3Value(value);
                input4.current?.focus();
            }
            else if(input === 4){
                setCode(code+value);
                setInput4Value(value);
                input5.current?.focus();
            }
            else if(input === 5){
                setCode(code+value);
                setInput5Value(value);
                input6.current?.focus();
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
        setInput3Value(undefined);
        setInput4Value(undefined);
        setInput5Value(undefined);
        setInput6Value(undefined);
        input1.current?.focus();
    }

    return(
        <CodeInputContainer
            style={props.style}
        >
            <InputContainer>
                <Input
                    ref={input1}
                    onChangeText={(value) => onInputChange(value, 1)}
                    onKeyPress={onInputKeyPress}
                    autoFocus={props.autoFocus}
                    error={props.error}
                    selectionColor={'transparent'}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={input1Value}
                    maxLength={1}
                />
            </InputContainer>
            <InputContainer>
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
                />
            </InputContainer>
            <InputContainer>
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
                />
            </InputContainer>
            <InputContainer>
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
                />
            </InputContainer>
            <InputContainer>
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
                />
            </InputContainer>
            <InputContainer>
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
                />
            </InputContainer>
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