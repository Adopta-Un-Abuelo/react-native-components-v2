import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Text from '../Text/Text';
import { Color } from '../../constants';
import { ArrowRight } from 'react-native-lucide';

const Button = styled.Pressable`
    flex-direction: row;
`

const CallToAction = (props: Props) =>{
    return(
        <Button
            {...props}
        >
            <Text
                type='b2'
                weight={props.semibold ? 'semibold' : 'medium'}
                style={{color: props.color ? props.color : Color.text.primary}}
            >
                {props.title}
            </Text>
            {props.showIcon &&
                <ArrowRight height={20} width={20} style={{marginLeft: 4}} color={props.color ? props.color : Color.text.primary}/>
            }
            {props.Icon &&
                props.Icon
            }
        </Button>
    )
}
export default CallToAction;
export interface Props{
    title: string,
    color?: string,
    style?: ViewStyle,
    onPress?: any,
    showIcon?: boolean,
    Icon?: any,
    semibold?: boolean
}