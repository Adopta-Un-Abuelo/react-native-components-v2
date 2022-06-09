import React from 'react';
import { TextStyle, TextProps, Text } from 'react-native';
import Color from '../../constants/Color';

const TextHeader = (props: Props) =>{

    const { style, type, children, weight, ...rest } = props;

    return(type === 'h1' ?
        <Text
            style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 32,
                lineHeight: 36,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h2' ?
        <Text
            style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 28,
                lineHeight: 36,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h3' ?
        <Text
            style={{
                fontFamily: weight === 'regular' ? 'Poppins-Regular' : 'Poppins-SemiBold',
                fontSize: 24,
                lineHeight: 32,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h4' ?
        <Text
            style={{
                fontFamily: weight === 'regular' ? 'Poppins-Regular' : 'Poppins-SemiBold',
                fontSize: 20,
                lineHeight: 28,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h5' ?
        <Text
            style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                lineHeight: 24,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h6' ?
        <Text
            style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                lineHeight: 22,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : undefined)
}
export default TextHeader;
export interface Props extends TextProps{
    style?: TextStyle,
    children?: any,
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | any,
    weight?: 'bold' | 'regular' | any
}