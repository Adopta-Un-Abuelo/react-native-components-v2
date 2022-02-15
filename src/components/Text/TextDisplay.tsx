import React from 'react';
import { TextStyle, TextProps } from 'react-native';

import Text from './Text';
import Color from '../../constants/Color';

const Subtitle = (props: Props) =>{

    return(
        props.type === 'd1' ?
            <Text
                style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 56,
                    lineHeight: 68,
                    color: Color.black,
                    ...props.style
                }}
            >
                {props.children}
            </Text>
        :
            <Text
                style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 56,
                    lineHeight: 68,
                    color: Color.black,
                    ...props.style
                }}
            >
                {props.children}
            </Text>
    )
}
export default Subtitle;
export interface Props extends TextProps{
    type?: 'd1' | 'd2' | any,
    style?: TextStyle,
    children?: any
}