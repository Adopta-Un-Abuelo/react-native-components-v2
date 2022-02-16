import React from 'react';
import styled from 'styled-components/native';
import { TextStyle } from 'react-native';

import Color from '../../constants/Color';

const TextStyled = styled.Text<{weight?: string, fontStyle?: string}>`
    font-size: 16px;
    line-height: 22px;
    font-family: ${props =>
        props.weight === 'semibold' ? 'Poppins-SemiBold' : 
        props.weight === 'medium' ? 'Poppins-Medium' : 
        props.fontStyle === 'italic' ? 'Poppins-Italic' :
        'Poppins-Regular'
    };
    color: ${Color.gray2};
`

const Text = (props: Props) =>{

    const { style, type, children, ...rest } = props;

    return(type === 'p2' ?
        <TextStyled
            style={{
                fontSize: 14,
                lineHeight: 20,
                ...style
            }}
            {...rest}
        >
            {children}
        </TextStyled>
    : 
        <TextStyled
            {...rest}
        >
            {children}
        </TextStyled>
    )
}
export default Text;
export interface Props{
    weight?: 'regular' | 'semibold' | 'medium',
    type?: 'p1' | 'p2' | any,
    fontStyle?: 'italic',
    style?: TextStyle,
    children?: any,
    numberOfLines?: number,
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip',
    adjustsFontSizeToFit?: boolean,
    onPress?: any
    allowFontScaling?: boolean
}