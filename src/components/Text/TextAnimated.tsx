import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TextProps, Animated } from 'react-native';

import Color from '../../constants/Color';

const TextStyled = styled(Animated.Text)<{type?: string}>`
    font-size: ${props => props.type  === 'h2' ? '28px' : '16px'};
    font-family: ${props => 
        props.type === 'h2' ? 'Poppins-Bold' : 
        /* props.weight === 'semibold' ? 'Poppins-SemiBold' : 
        props.weight === 'medium' ? 'Poppins-Medium' : 
        props.fontStyle === 'italic' ? 'Poppins-Italic' : */
        'Poppins-Regular'
    };
    color: ${Color.black};
    line-height: 36px;
    ...props.style
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
    type: 'h2' | 'other'
}