import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';
import Color from '../../constants/Color'

const Container = styled.View`
    flex-direction: row;
`
const Image = styled.View`
    margin-right: 3px;
`

const Review: FC<Props> = props =>{
    return(
        <Container
            style={props.style}
        >
            <Image>
                <Star strokeWidth={1} height={16} width={16} color={Color.background.secondary} fill={Color.background.secondary}/>
            </Image>
            <Image>
                <Star strokeWidth={1} height={16} width={16} color={Color.background.secondary} fill={Color.background.secondary}/>
            </Image>
            <Image>
                <Star strokeWidth={1} height={16} width={16} color={Color.background.secondary} fill={Color.background.secondary}/>
            </Image>
            <Image>
                <Star strokeWidth={1} height={16} width={16} color={Color.background.secondary} fill={Color.background.secondary}/>
            </Image>
            <Image>
                <Star strokeWidth={1} height={16} width={16} color={Color.background.secondary} fill={Color.background.secondary}/>
            </Image>
        </Container>
    )
}
export default Review
export interface Props{
    style?: ViewStyle
}