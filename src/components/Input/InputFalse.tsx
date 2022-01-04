import React, { FC, forwardRef } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.Pressable<{error?: boolean}>`
    height: 64px;
    border-color: ${props => props.error ? Color.error :'transparent'};
    border-width: 1px;
    border-radius: 24px;
    align-items: center;
    flex-direction: row;
    padding: 0px 24px;
    background-color: ${Color.gray6};
`
const IconView = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 12px;
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
            {props.icon &&
                <IconView>
                    <props.icon stroke={props.error ? Color.error : Color.blue3}/>
                </IconView>
            }
            {children}
            <InputView>
                {props.value &&
                    <Text
                        style={{position: 'absolute', top: 10, fontSize: 14, color: Color.gray4}}
                    >
                        {placeholder}
                    </Text>
                }
                <Text
                    style={{color: props.value ? Color.gray2 : Color.gray4, marginTop: props.value ? 18 : 0}}
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
    icon?: any,
    placeholder?: string,
    ref?: any,
    style?: ViewStyle,
    value?: string,
    onPress?: Function
}