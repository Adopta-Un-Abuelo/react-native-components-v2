import React from 'react';
import { TextStyle, TextProps } from 'react-native';
import Text from './Text';
import Color from '../../constants/Color';

const TextOverline = (props: Props) =>{

    const { style, children, type, ...rest } = props;

    return(
        <Text
            style={{
                fontFamily: 'Poppins-Medium',
                fontSize: type === 'o1' ? 12 : 11,
                lineHeight: type === 'o1' ? 16 : 14,
                letterSpacing: 0.5,
                color: Color.text.full,
                textTransform: 'uppercase',
                ...style
            }}
            {...rest}
        >
            {children}
        </Text>
    )
}
export default TextOverline;
export interface Props extends TextProps{
    style?: TextStyle,
    children?: any,
    type?: 'o1' | 'o2' | any,
}