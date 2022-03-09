import React, { FC, forwardRef } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.Pressable<{error?: boolean}>`
    height: 56px;
    border-color: ${props => props.error ? Color.status.color.error : Color.line.primarySoft};
    border-width: ${props => props.error ? '2px' : '1px'};
    border-radius: 12px;
    align-items: center;
    flex-direction: row;
    padding: 0px 16px;
`
const InputView = styled.View`
    flex: 1;
    height: 100%;
    justify-content: center;
`

const Input: FC<Props> = forwardRef((props, ref) =>{

    const { children, style, placeholder } = props;

    const onPress = () =>{
        props.onPress && props.onPress();
    }

    return(
        <Container
            style={style}
            error={props.error}
            onPress={onPress}
        >
            {children}
            <InputView>
                {props.value &&
                    <Text
                        type='c1'
                        style={{position: 'absolute', top: 8, color: Color.text.medium}}
                    >
                        {placeholder}
                    </Text>
                }
                <Text
                    type='p1'
                    style={{color: props.value ? Color.text.medium : Color.text.low, marginTop: props.value ? 18 : 0}}
                    numberOfLines={1}
                >
                    {props.value ? props.value : props.placeholder}
                </Text>
            </InputView>
        </Container>
    )
});
export default Input;
export interface Props{
    error?: boolean,
    placeholder?: string,
    ref?: any,
    style?: ViewStyle,
    value?: string,
    onPress?: Function
}