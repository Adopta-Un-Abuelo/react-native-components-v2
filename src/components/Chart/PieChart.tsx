import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native'
import Svg, { G, Circle } from "react-native-svg";

import Color from '../../constants/Color';

const Container = styled.View`
    background-color: white;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
`
const BackgroundContainer = styled.View`
    position: absolute;
    flex: 1;
    border-radius: 100%;
    height: 100%;
    width: 100%;
    padding: 16px;
    align-items: center;
    justify-content: center;
`
const Background = styled.View`
    background-color: white;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 100%;
`

const PieChart = (props: Props) =>{

    const [ data, setData ] = useState([]);

    const height = props.height ? props.height : 176;
    const width = props.width ? props.width : 176;
    const radius = height / 2;
    const circunference = 2 * Math.PI * (radius-2);

    useEffect(() =>{
        var temp = props.data.map((item, index) =>{
            const prevItem = index > 0 ? props.data[index-1] : undefined;
            const prevPercentage = prevItem ? prevItem.percentage : 0;
            return{
                ...item,
                percentage: item.percentage+prevPercentage
            }
        });
        temp.push({
            id: 'all',
            percentage: 100,
            color: Color.background.soft
        })
        temp = temp.sort((a, b) => b.percentage - a.percentage);
        setData(temp);
    },[props.data]);

    return(
        <Container
            style={{
                ...props.style, 
                height: height,
                width: width
            }}
        >
            <Svg height={height} width={width} viewBox="0 0 180 180">
                <G rotation={-90} originX="90" originY="90">
                    {data.map((item) =>(
                        <Circle
                            key={item.id}
                            cx="50%"
                            cy="50%"
                            r={radius-2}
                            stroke={item.color}
                            fill="transparent"
                            strokeWidth={props.strokeWidth ? props.strokeWidth : 8}
                            strokeDasharray={circunference}
                            strokeDashoffset={circunference - (circunference * item.percentage) / 100}
                            rotation={0}
                            originX="90"
                            originY="90"
                            strokeLinecap="butt"
                        />
                    ))}
                </G>
            </Svg>
            <BackgroundContainer>
                <Background>
                    {props.children}
                </Background>
            </BackgroundContainer>
        </Container>
    )
}
export default PieChart;
export interface Props{
    style?: ViewStyle,
    backgroundStyle?: ViewStyle,
    height?: number,
    width?: number,
    strokeWidth?: number,
    children?: any,
    data: Array<{
        id: string,
        percentage: number,
        color: string
    }>
}