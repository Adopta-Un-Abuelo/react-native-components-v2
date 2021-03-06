import React from 'react';
import { TextStyle, TextProps, Text } from 'react-native';
import Color from '../../constants/Color';

const TextButton = (props: Props) =>{

    const { style, type, children, weight, ...rest } = props;

    return(type === 'b1' ?
        <Text
            style={{
                fontFamily: weight === 'medium' ? 'Poppins-Medium' : 'Poppins-SemiBold',
                fontSize: 16,
                lineHeight: 22,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'b2' ?
        <Text
            style={{
                fontFamily: weight === 'medium' ? 'Poppins-Medium' : 'Poppins-SemiBold',
                fontSize: 14,
                lineHeight: 20,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
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