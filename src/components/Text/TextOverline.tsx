import React from 'react';
import { TextStyle, TextProps } from 'react-native';

import Text from './Text';
import Color from '../../constants/Color';

const TextOverline = (props: Props) =>{

    return(
        <Text
            style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 20,
                letterSpacing: 0.5,
                color: Color.gray2,
                textTransform: 'uppercase',
                ...props.style
            }}
        >
            {props.children}
        </Text>
    )
}
export default TextOverline;
export interface Props extends TextProps{
    style?: TextStyle,
    children?: any
}