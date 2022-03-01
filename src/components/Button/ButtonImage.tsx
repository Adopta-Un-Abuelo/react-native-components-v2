import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Button = styled.Pressable`
    flex-direction: row;
    align-items: center;
    padding: 8px;
`
const Icon = styled.Image`
    height: 32px;
    width: 32px;
`

const ButtonImage = (props: Props) =>{

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
                    color={props.color ? props.color : Color.gray2}
                    fill={props.fill ? props.fill : 'transparent'}
                />
            }
            {props.title &&
                <Text
                    style={{marginLeft: 8}}
                >
                    {props.title}
                </Text>
            }
        </Button>
    )
}
export default ButtonImage;
export interface Props{
    source?: any,
    icon?: any,
    onPress: any,
    style?: ViewStyle,
    height?: number,
    width?: number,
    color?: string,
    fill?: string
    title?: string
}