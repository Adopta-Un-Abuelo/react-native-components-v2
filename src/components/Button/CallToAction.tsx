import React from 'react';
import styled from 'styled-components/native';
import { ButtonProps } from 'react-native';

import Text from '../Text/Text';
import { Color } from '../../constants';

const Button = styled.Pressable`
`

const CallToAction = (props: Props) =>{

    return(
        <Button
            {...props}
        >
            <Text
                style={{color: props.color ? props.color : Color.blue3}}
            >
                {props.title}
            </Text>
        </Button>
    )
}
export default CallToAction;
export interface Props extends ButtonProps{
    title: string,
    color?: string
}