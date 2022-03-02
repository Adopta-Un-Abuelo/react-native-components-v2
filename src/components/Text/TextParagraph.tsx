import React from 'react';
import { TextStyle } from 'react-native';
import Text from './Text';
import Color from '../../constants/Color';

const TextParagraph = (props: Props) =>{

    const { style, type, children, weight, fontStyle, ...rest } = props;

    return(type === 'p1' ?
        <Text
            style={{
                fontFamily: weight === 'semibold' ? 'Poppins-SemiBold' : weight === 'medium' ? 'Poppins-Medium' : fontStyle === 'italic' ? 'Poppins-Italic' : 'Poppins-Regular',
                fontSize: 15,
                lineHeight: 22,
                color: Color.text.full,
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    : type === 'p2' ?
        <Text
            style={{
                fontFamily: weight === 'medium' ? 'Poppins-Medium' : fontStyle === 'italic' ? 'Poppins-Italic' : 'Poppins-Regular',
                fontSize: 14,
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
export default TextParagraph;
export interface Props{
    weight?: 'regular' | 'semibold' | 'medium',
    type?: 'p1' | 'p2' | any,
    fontStyle?: 'italic',
    style?: TextStyle,
    children?: any
}