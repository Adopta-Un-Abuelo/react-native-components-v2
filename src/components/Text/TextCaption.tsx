import React from 'react';
import { TextStyle, TextProps, Text } from 'react-native';
import Color from '../../constants/Color';

const TextCaption = (props: Props) =>{

    const { style, type, children, weight, ...rest } = props;

    return(type === 'c1' ?
        <Text
            style={{
                fontFamily: weight === 'medium' ? 'Poppins-Medium' : 'Poppins-Regular',
                fontSize: 13,
                lineHeight: 20,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'c2' ?
        <Text
            style={{
                fontFamily: weight === 'medium' ? 'Poppins-Medium' : 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 18,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : undefined)
}
export default TextCaption;
export interface Props extends TextProps{
    style?: TextStyle,
    children?: any,
    type?: 'c1' | 'c2' | any,
    weight?: 'medium' | 'regular' | any
}