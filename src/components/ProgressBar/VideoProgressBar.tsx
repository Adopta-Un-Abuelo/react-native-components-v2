import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.View`
    flex: 1;
    flex-direction: column;
`
const MarkView = styled.View`
    height: 20px;
    flex-direction: row;
    margin-top: 4px;
`

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
                height={12}
                borderRadius={10}
                borderWidth={0}
                unfilledColor={Color.gray5}
                color={Color.blue3}
            />
            <MarkView>
                <Text
                    style={{flex: 1, fontSize: 12, color: Color.gray4}}
                    weight={'semibold'}
                >
                    {new Date(progressLeft * 1000).toISOString().substr(14, 5)}
                </Text>
                <Text
                    style={{flex: 1, textAlign: 'right', fontSize: 12, color: Color.gray4}}
                    weight={'semibold'}
                >
                    {new Date(props.maxProgress * 1000).toISOString().substr(14, 5)}
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