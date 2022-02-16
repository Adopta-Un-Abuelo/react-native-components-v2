import React from 'react';
import { TextStyle, TextProps } from 'react-native';

import Text from './Text';
import Color from '../../constants/Color';

const TextHeader = (props: Props) =>{

    const { style, type, children, ...rest } = props;

    return(type === 'h1' ?
        <Text
            style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 32,
                lineHeight: 36,
                color: Color.black,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h2' ?
        <Text
            style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 28,
                lineHeight: 36,
                color: Color.black,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h3' ?
        <Text
            style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 24,
                lineHeight: 32,
                color: Color.black,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'h4' ?
        <Text
            style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                lineHeight: 26,
                color: Color.gray2,
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
                lineHeight: 22,
                color: Color.gray2,
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
                color: Color.gray2,
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
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | any
}