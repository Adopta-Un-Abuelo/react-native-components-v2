import React, { FC } from 'react';
import styled from 'styled-components/native';
import Color from '../../constants/Color';

const Button = styled.Pressable`
    flex-direction: row;
    align-items: center;
    padding: 8px;
    align-self: flex-start;
`
const Icon = styled.Image`
    height: 32px;
    width: 32px;
`

const ButtonImage: FC<Props> = props =>{

    const { source, icon, height, width, ...restProps } = props;

    return(
        <Button
            {...restProps}
            onPress={props.onPress}
        >
            {source &&
                <Icon
                    source={source}
                />
            }
            {icon &&
                <props.icon 
                    height={height ? height : 32} 
                    width={width ? width : 32} 
                    stroke={props.color ? props.color : Color.gray2}
                    fill={props.fill ? props.fill : 'transparent'}
                />
            }
            {props.children}
        </Button>
    )
}
export default ButtonImage;
export interface Props{
    source?: any,
    icon?: any,
    onPress: any,
    style?: Object,
    height?: number,
    width?: number,
    color?: string,
    fill?: string
}