import React from 'react';
import styled from 'styled-components/native';
import { TextStyle } from 'react-native';

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
    color: ${Color.gray2};
`

const Text = (props: Props) =>{
    return(
        <TextStyled
            {...props}
        >
            {props.children}
        </TextStyled>
    )
}
export default Text;
export interface Props{
    weight?: 'bold' | 'regular' | 'semibold' | 'medium',
    fontStyle?: 'italic',
    style?: TextStyle,
    children?: any,
    numberOfLines?: number,
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip',
    adjustsFontSizeToFit?: boolean,
    onPress?: any
}