import React from 'react';
import { ViewStyle } from 'react-native'

import PieChart from './PieChart';

const Chart = (props: Props) =>{
    
    const { type, ...rest } = props;

    return(type === 'pie' ?
        <PieChart {...rest}/>
    : null)
}
export default Chart;
export interface Props{
    type: 'pie',
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