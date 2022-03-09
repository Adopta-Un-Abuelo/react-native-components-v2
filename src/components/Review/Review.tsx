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
                style={{marginRight: 14}}
                Icon={<Heart height={40} width={40} color={selection >= 1 ? Color.text.primary : Color.line.primarySoft}/>}
                onPress={() => onButtonPress(1)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                Icon={<Heart height={40} width={40} color={selection >= 2 ? Color.text.primary : Color.line.primarySoft}/>}
                onPress={() => onButtonPress(2)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                Icon={<Heart height={40} width={40} color={selection >= 3 ? Color.text.primary : Color.line.primarySoft}/>}
                onPress={() => onButtonPress(3)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                Icon={<Heart height={40} width={40} color={selection >= 4 ? Color.text.primary : Color.line.primarySoft}/>}
                onPress={() => onButtonPress(4)}
            />
            <ButtonImage
                Icon={<Heart height={40} width={40} color={selection >= 5 ? Color.text.primary : Color.line.primarySoft}/>}
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