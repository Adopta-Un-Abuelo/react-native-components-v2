import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';

const ProgressView = styled.View`
    flex: 1;
`

const ProgressBar: FC<Props> = props =>{

    const [ barProgress, setBarProgress ] = useState(0);

    useEffect(() =>{
        if(props.maxProgress > 0)
            setBarProgress(props.progress/props.maxProgress);
    },[props.progress, props.maxProgress]);

    return(
        <ProgressView
            style={props.style}
        >
            <Progress.Bar
                width={null}
                progress={barProgress} 
                borderRadius={6}
                height={props.height ? props.height : 6}
                borderWidth={0}
                unfilledColor={props.colorBarTotal}
                color={props.colorBarLeft}>
            </Progress.Bar>
        </ProgressView>
    )
}
export default ProgressBar;
export interface Props{
    style?: any,
    height?: number,
    progress: number,
    maxProgress: number,
    colorBarLeft?: any,
    colorBarTotal?: any
}