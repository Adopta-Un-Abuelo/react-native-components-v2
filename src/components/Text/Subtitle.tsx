import React from 'react';
import { TextStyle, TextProps } from 'react-native';

import Text from './Text';

const Subtitle = (props: Props) =>{

    return(
        <Text
            style={{
                fontFamily: 'Poppins-Regular',
                marginBottom: 24,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: 'white',
                ...props.style
            }}
        >
            {props.children}
        </Text>
    )
}
export default Subtitle;
export interface Props extends TextProps{
    style?: TextStyle,
    children?: any
}