import React, { FC, useEffect, useState } from 'react';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import { StyleSheet } from 'react-native'

const ProgressBar: FC<Props> = props =>{

    const [ barProgress, setBarProgress ] = useState(0);

    useEffect(() =>{
        if(props.maxProgress > 0)
            setBarProgress(props.progress/props.maxProgress);
    },[props.progress, props.maxProgress]);

    return(
        <SimpleGradientProgressbarView
            style={StyleSheet.flatten([
                props.style,
                {
                    backgroundColor: props.colorBarTotal,
                    height: props.height ? props.height : 12,
                    borderRadius: 6,
                }])}
            fromColor={props.colorBarLeft}
            toColor={props.colorBarLeftGradient ? props.colorBarLeftGradient : props.colorBarLeft}
            progress={barProgress}
            maskedCorners={[1, 1, 1, 1]}
            cornerRadius={6}
        />
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
    colorBarTotal?: any
}