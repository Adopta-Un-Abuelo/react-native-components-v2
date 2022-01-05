import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';

import Color from '../../constants/Color';

const Container = styled.View`
    flex: 1;
    flex-direction: column;
`

const ProgressBar: FC<Props> = props =>{

    const [ seconds, setSeconds ] = useState(0);
    
    useEffect(() =>{
        if(!props.pause){
            setSeconds(0);
            const interval = setInterval(() => {
                setSeconds(seconds => {
                    if(seconds < props.maxTime)
                        return seconds + 0.1;
                    else {
                        props.onFinish();
                        clearInterval(interval);
                        return props.maxTime;
                    }
                });
            }, 100);
            return () => {
                clearInterval(interval);
            }
        }
    },[props.pause]);

    useEffect(() =>{
        if(props.fill){
            setSeconds(props.maxTime)
        }
    },[props.fill]);

    useEffect(() =>{
        if(props.clean){
            setSeconds(0)
        }
    },[props.clean]);

    return(
        <Container
            style={props.style}
        >
             <Progress.Bar
                width={null}
                progress={seconds/props.maxTime}
                height={4}
                borderRadius={10}
                borderWidth={0}
                unfilledColor={props.unfilledColor ? props.unfilledColor : Color.gray5}
                color={props.color ? props.color : Color.blue3}
            />
        </Container>
    )
}
export default ProgressBar;
export interface Props{
    style?: Object,
    maxTime: number,
    onFinish: Function,
    pause: boolean,
    fill?: boolean,
    clean?: boolean,
    color?: string,
    unfilledColor?: string
}