import React from 'react';
import styled from 'styled-components/native';

import Color from '../../constants/Color';

const Input = styled.TextInput`
    border-color: ${Color.gray5};
    border-width: 1px;
    height: 169px;
    border-radius: 12px;
    padding: 16px;
    font-family: 'Poppins-Regular';
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