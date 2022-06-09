import React, { FC, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';

const ProgressView = styled.View`
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
`

const ProgressBar: FC<Props> = props =>{

    const [ barProgress, setBarProgress ] = useState(0);

    useEffect(() =>{
        if(props.maxProgress > 0)
            setBarProgress(props.progress/props.maxProgress);
    },[props.progress, props.maxProgress]);

    return(
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
    )
}
export default ProgressBar;
export interface Props{
    progress: number,
    maxProgress: number,
    colorBarLeft: any,
    colorBarTotal: any
}