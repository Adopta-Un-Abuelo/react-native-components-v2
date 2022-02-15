import React from 'react';
import { TextStyle, TextProps } from 'react-native';

import Text from './Text';
import Color from '../../constants/Color';

const TextCaption = (props: Props) =>{

    return(props.type === 'c1' ?
        <Text
            {...props}
            style={{
                fontFamily: props.weight === 'medium' ? 'Poppins-Medium' : 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 16,
                color: Color.gray2,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    : props.type === 'c2' ?
        <Text
            {...props}
            style={{
                fontFamily: props.weight === 'medium' ? 'Poppins-Medium' : 'Poppins-Regular',
                fontSize: 10,
                lineHeight: 14,
                color: Color.gray2,
                ...props.style
            }}
        >
            {props.children}
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