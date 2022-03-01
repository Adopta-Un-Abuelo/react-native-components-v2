import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

import { Heart } from 'react-native-lucide';
import ButtonImage from '../Button/ButtonImage';
import Color from '../../constants/Color'

const Container = styled.View`
    flex-direction: row;
`

const Review: FC<Props> = props =>{

    const [ selection, setSelection ] = useState(0);

    const onButtonPress = index =>{
        setSelection(index);
        props.onChange && props.onChange(index);
    }

    return(
        <Container
            style={props.style}
        >
            <ButtonImage
                icon={Heart}
                height={40}
                width={40}
                color={selection >= 1 ? Color.blue3 : Color.gray3}
                fill={selection >= 1 ? Color.blue3 : 'transparent'}
                onPress={() => onButtonPress(1)}
            />
            <ButtonImage
                icon={Heart}
                height={40}
                width={40}
                color={selection >= 2 ? Color.blue3 : Color.gray3}
                fill={selection >= 2 ? Color.blue3 : 'transparent'}
                onPress={() => onButtonPress(2)}
            />
            <ButtonImage
                icon={Heart}
                height={40}
                width={40}
                color={selection >= 3 ? Color.blue3 : Color.gray3}
                fill={selection >= 3 ? Color.blue3 : 'transparent'}
                onPress={() => onButtonPress(3)}
            />
            <ButtonImage
                icon={Heart}
                height={40}
                width={40}
                color={selection >= 4 ? Color.blue3 : Color.gray3}
                fill={selection >= 4 ? Color.blue3 : 'transparent'}
                onPress={() => onButtonPress(4)}
            />
            <ButtonImage
                icon={Heart}
                height={40}
                width={40}
                color={selection >= 5 ? Color.blue3 : Color.gray3}
                fill={selection >= 5 ? Color.blue3 : 'transparent'}
                onPress={() => onButtonPress(5)}
            />
        </Container>
    )
}
export default Review
export interface Props{
    style?: ViewStyle,
    onChange?: Function
}