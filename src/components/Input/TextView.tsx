import React from 'react';
import styled from 'styled-components/native';
import Color from '../../constants/Color';

const Input = styled.TextInput<{error?: boolean, isFocused: boolean | undefined}>`
    border-color: ${props => props.error ? Color.status.color.error : props.isFocused ? Color.line.primarySoft : Color.line.soft};
    border-width: ${props => props.error || props.isFocused ? '2px' : '1px'};
    border-radius: 12px;
    color: ${Color.text.full};
    min-height: 169px;
    padding: 16px;
    font-family: 'Poppins-Regular';
    font-size: 15px;
    line-height: 22px;
    justify-content: flex-start;
    align-items: flex-start;
`

const TextInputStyled = props =>{
    return(
        <Input
            textAlignVertical={'top'}
            multiline={true}
            {...props}
        />
    )
}
export default TextInputStyled;