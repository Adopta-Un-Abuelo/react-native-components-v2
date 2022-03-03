import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.View`
    flex: 1;
`
const MarkView = styled.View`
    flex-direction: row;
    margin-top: 10px;
`

const getSeconds = (secs) => {
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var tempSeconds = seconds < 10 ? '0' + seconds : seconds;
    return (minutes + ':' + tempSeconds);
}

const ProgressBar: FC<Props> = props =>{

    const [ progressLeft, setProgressLeft ] = useState(0);
    const [ barProgress, setBarProgress ] = useState(0);

    useEffect(() =>{
        const left = (props.progress).toFixed(0);
        setProgressLeft(parseFloat(left));
        if(props.maxProgress > 0)
            setBarProgress(props.progress/props.maxProgress);
    },[props.progress, props.maxProgress]);

    return(
        <Container
            style={props.style}
        >
            <Progress.Bar
                width={null}
                progress={barProgress}
                height={6}
                borderRadius={10}
                borderWidth={0}
                unfilledColor={Color.background.soft}
                color={Color.background.primary}
            />
            <MarkView>
                <Text
                    type='c1'
                    style={{flex: 1, color: Color.text.primary}}
                >
                    {getSeconds(progressLeft)}
                </Text>
                <Text
                    type='c1'
                    style={{flex: 1, textAlign: 'right', color: Color.text.high}}
                >
                    {getSeconds(props.maxProgress.toFixed(0))}
                </Text>
            </MarkView>
        </Container>
    )
}
export default ProgressBar;
export interface Props{
    style?: Object,
    progress: number,
    maxProgress: number
}