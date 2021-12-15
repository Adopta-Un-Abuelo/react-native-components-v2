import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TextProps } from 'react-native';

import Color from '../../constants/Color';

const TextStyled = styled.Text<{weight?: string, fontStyle?: string}>`
    font-size: 16px;
    font-family: ${props => 
        props.weight === 'bold' ? 'Poppins-Bold' : 
        props.weight === 'semibold' ? 'Poppins-SemiBold' : 
        props.weight === 'medium' ? 'Poppins-Medium' : 
        props.fontStyle === 'italic' ? 'Poppins-Italic' :
        'Poppins-Regular'
    };
    color: ${Color.gray3};
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
    weight?: 'bold' | 'regular' | 'semibold' | 'medium',
    fontStyle?: 'italic'
    onPress?: any,
    ref?: any
}