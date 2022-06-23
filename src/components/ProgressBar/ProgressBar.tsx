import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import { StyleSheet } from 'react-native'

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
        <>
            {props.gradient ? 
                <SimpleGradientProgressbarView
                    style={StyleSheet.flatten([
                        props.style,
                        {
                            backgroundColor: props.colorBarTotal,
                            height: props.height ? props.height : 12,
                            borderRadius: 6,
                        }])}
                    fromColor={props.colorBarLeft}
                    toColor={props.colorBarLeftGradient}
                    progress={barProgress}
                    maskedCorners={[1, 1, 1, 1]}
                    cornerRadius={6}
                />
            :
                <ProgressView
                    style={props.style}
                >
                    <Progress.Bar
                        width={null}
                        progress={barProgress}
                        height={props.height ? props.height : 6}
                        borderRadius={100}
                        borderWidth={0}
                        unfilledColor={props.colorBarTotal}
                        color={props.colorBarLeft}
                    />
                </ProgressView>
            }
        </>
    )
}
export default ProgressBar;
export interface Props{
    style?: any,
    height?: number,
    progress: number,
    maxProgress: number,
    colorBarLeft?: any,
    colorBarLeftGradient?: any,
    colorBarTotal?: any,
    gradient?: boolean
}