import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

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
                type='b1'
                weight='semibold'
                style={{color: props.color ? props.color : Color.blue3}}
            >
                {props.title}
            </Text>
        </Button>
    )
}
export default CallToAction;
export interface Props{
    title: string,
    color?: string,
    style?: ViewStyle,
    onPress?: any
}