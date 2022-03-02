import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';

const Button = styled.Pressable`
	justify-content: center;
	align-items: center;
    height: 36px;
    width: 36px;
`

const ButtonImage = (props: Props) =>{

    const { icon, ...restProps } = props;

    return(
        <Button
            {...restProps}
            onPress={props.onPress}
        >
            {icon &&
                <props.icon 
                    height={24}
                    width={24}
                    color={props.color ? props.color : Color.text.full}
                />
            }
            {props.Icon && props.Icon}
        </Button>
    )
}
export default ButtonImage;
export interface Props{
    icon?: any,
    Icon?: any,
    onPress: any,
    style?: ViewStyle,
    color?: string
}