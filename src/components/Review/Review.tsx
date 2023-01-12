import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Heart } from 'lucide-react-native';
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
                icon={Heart}
                iconProps={{
                    height: 40,
                    width: 40,
                    strokeWidth: 1
                }}
                selected={selection >= 1}
                color={Color.line.primarySoft}
                colorFill={Color.text.primary}
                onPress={() => onButtonPress(1)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                icon={Heart}
                iconProps={{
                    height: 40,
                    width: 40,
                    strokeWidth: 1
                }}
                selected={selection >= 2}
                color={Color.line.primarySoft}
                colorFill={Color.text.primary}
                onPress={() => onButtonPress(2)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                icon={Heart}
                iconProps={{
                    height: 40,
                    width: 40,
                    strokeWidth: 1
                }}
                selected={selection >= 3}
                color={Color.line.primarySoft}
                colorFill={Color.text.primary}
                onPress={() => onButtonPress(3)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                icon={Heart}
                iconProps={{
                    height: 40,
                    width: 40,
                    strokeWidth: 1
                }}
                selected={selection >= 4}
                color={Color.line.primarySoft}
                colorFill={Color.text.primary}
                onPress={() => onButtonPress(4)}
            />
            <ButtonImage
                style={{marginRight: 14}}
                icon={Heart}
                iconProps={{
                    height: 40,
                    width: 40,
                    strokeWidth: 1
                }}
                selected={selection >= 5}
                color={Color.line.primarySoft}
                colorFill={Color.text.primary}
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