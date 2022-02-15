import React from 'react';
import { TextStyle, TextProps } from 'react-native';

import Text from './Text';
import Color from '../../constants/Color';

const TextButton = (props: Props) =>{

    return(props.type === 'b1' ?
        <Text
            style={{
                fontFamily: props.weight === 'medium' ? 'Poppins-Medium' : 'Poppins-SemiBold',
                fontSize: 16,
                lineHeight: 20,
                color: Color.gray2,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    : props.type === 'b2' ?
        <Text
            style={{
                fontFamily: props.weight === 'medium' ? 'Poppins-Medium' : 'Poppins-SemiBold',
                fontSize: 14,
                lineHeight: 22,
                color: Color.gray2,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    : undefined)
}
export default TextButton;
export interface Props extends TextProps{
    style?: TextStyle,
    children?: any,
    type?: 'b1' | 'b2' | any,
    weight?: 'medium' | 'semibold' | any
}