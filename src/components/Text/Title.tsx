import React from 'react';
import { TextProps, Animated } from 'react-native';
import styled from 'styled-components/native';

import Color from '../../constants/Color';

const Text = styled(Animated.Text)`
    font-size: 42px;
    color: ${Color.gray2};
    font-family: 'Poppins-Bold';
`

const Title = (props: Props) =>{
    return(
        <Text
            {...props}
        >
            {props.children}
        </Text>
    )
}
export default Title;
export interface Props extends TextProps{
    style?: Object
}