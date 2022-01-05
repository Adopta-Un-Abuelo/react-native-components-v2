import React, { FC } from 'react';
import styled from 'styled-components/native';

import Color from '../../constants/Color';

const Input = styled.TextInput`
    background-color: ${Color.gray6};
    height: 169px;
    border-radius: 24px;
    padding: 24px 16px;
    font-family: 'Poppins';
    color: ${Color.gray2};
    justify-content: flex-start;
    align-items: flex-start;
`

const TextInputStyled = props =>{

    return(
        <Input
            selectionColor={Color.blue3}
            textAlignVertical={'top'}
            multiline={true}
            {...props}
        />
    )
}
export default TextInputStyled;