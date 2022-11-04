import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TextProps, Animated } from 'react-native';
import Color from '../../constants/Color';

const TextStyled = styled(Animated.Text)<{type?: string}>`
    font-size: ${props => props.type  === 'h2' ? '28px' : '16px'};
    font-family: ${props => 
        props.type === 'h2' ? 'Poppins-Bold' : 
        props.type === 'h3' ? 'Poppins-SemiBold' : 
        'Poppins-Regular'
    };
    color: ${Color.text.full};
    line-height: 36px;
`

const Text: FC<Props> = props =>{
    return(
        <TextStyled
            {...props}
        >
            {props.children}
        </TextStyled>
    )
}
export default Text;
export interface Props extends TextProps{
    style?: Object
    type: 'h2' | 'h3' | 'other'
}