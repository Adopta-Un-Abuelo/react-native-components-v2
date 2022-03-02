import React from 'react';
import { TextStyle, TextProps } from 'react-native';
import Text from './Text';
import Color from '../../constants/Color';

const TextDisplay = (props: Props) =>{

    const { style, type, children, ...rest } = props;

    return(
        type === 'd1' ?
            <Text
                style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 48,
                    lineHeight: 60,
                    color: Color.text.full,
                    ...style
                }}
                {...rest}
            >
                {children}
            </Text>
        :
            <Text
                style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 48,
                    lineHeight: 60,
                    color: Color.text.full,
                    ...style
                }}
                {...rest}
            >
                {children}
            </Text>
    )
}
export default TextDisplay;
export interface Props extends TextProps{
    type?: 'd1' | 'd2' | any,
    style?: TextStyle,
    children?: any
}