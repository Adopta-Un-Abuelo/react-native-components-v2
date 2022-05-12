import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';
import Text from '../Text/Text';

const Container = styled.View`
    flex-direction: row;
    flex: 1;
    justify-content: center;
    align-items: center;
`
const ProgressView = styled.View`
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
`

const getSeconds = (secs) => {
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var tempSeconds = seconds < 10 ? '0' + seconds : seconds;
    return (minutes + ':' + tempSeconds);
}

const VideoProgressBar: FC<Props> = props =>{

    const [ progressLeft, setProgressLeft ] = useState(0);
    const [ barProgress, setBarProgress ] = useState(0);

    useEffect(() =>{
        const left = (props.progress).toFixed(0);
        setProgressLeft(parseFloat(left));
        if(props.maxProgress > 0)
            setBarProgress(props.progress/props.maxProgress);
    },[props.progress, props.maxProgress]);

    return(
        <Container>
            <Text
                type='c1'
                style={{color: props.colorTextLeft}}
            >
                {getSeconds(progressLeft)}
            </Text>
            <ProgressView>
                <Progress.Bar
                    width={null}
                    progress={barProgress}
                    height={6}
                    borderRadius={10}
                    borderWidth={0}
                    unfilledColor={props.colorBarTotal}
                    color={props.colorBarLeft}
                />
            </ProgressView>
            <Text
                type='c1'
                style={{textAlign: 'right', color: props.colorTextTotal}}
            >
                {getSeconds(props.maxProgress.toFixed(0))}
            </Text>
        </Container>
    )
}
export default VideoProgressBar;
export interface Props{
    progress: number,
    maxProgress: number,
    colorTextLeft: any,
    colorTextTotal: any,
    colorBarLeft: any,
    colorBarTotal: any
}