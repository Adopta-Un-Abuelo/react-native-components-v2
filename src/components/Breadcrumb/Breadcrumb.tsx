import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

import Color from '../../constants/Color';

const Container = styled(Animated.View)`
    flex-direction: row;
    height: 8px;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Crumb = styled.View<{active: boolean}>`
    height: ${props => props.active ? '10px' : '8px'};
    width: ${props => props.active ? '10px' : '8px'};
    margin-right: 8px;
    border-radius: 100px;
    background-color: ${props => props.active ? Color.background.primary : Color.text.low};
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
    style?: any,
    steps: number,
    currentStep: number
}