import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, Animated } from 'react-native';

import Color from '../../constants/Color';

const Container = styled(Animated.View)`
    flex-direction: row;
    height: 8px;
`
const Crumb = styled.View<{active: boolean}>`
    height: 8px;
    width: 8px;
    margin-right: 15px;
    border-radius: 4px;
    background-color: ${props => props.active ? Color.blue3 : Color.gray4};
`

const Breadcrumb = (props: Props) =>{

    const array = Array.from(Array(props.steps).keys())

    return(
        <Container
            style={props.style}
        >
            {array.map((item, index) =>(
                <Crumb
                    key={'crumb'+index}
                    active={index <= props.currentStep}
                />
            ))}
        </Container>
    )
}
export default Breadcrumb;
export interface Props{
    style?: ViewStyle,
    steps: number,
    currentStep: number
}