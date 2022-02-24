import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { GestureResponderEvent, PressableProps, ViewStyle, TextStyle } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.Pressable<{type?: 'line' | 'fill', color?: string, size?: 'small' | 'big'}>`
    flex-direction: row;
    height: 48px;
    border-radius: 12px;
    background-color: ${props => props.type === 'line' ? 'transparent' : (props.color ? props.color : Color.blue3)};
    align-items: center;
    justify-content: center;
    border-width: ${props => props.type === 'line' ? '1px' : '0px'};
    border-color: ${props => props.color ? props.color : Color.blue3};
    padding: 0px 24px;
    opacity: ${props => props.disabled ? 0.48 : 1};
`

const Button = (props: Props) =>{

    const onPress = (e: GestureResponderEvent) =>{
        if(!props.loading)
            props.onPress && props.onPress(e);
    }

    return(
        <Container
            style={props.style}
            disabled={props.disabled}
            onPress={onPress}
            type={props.type}
            color={props.color}
        >
            {props.loading ?
                <LottieView 
                    style={{width: 100}}
                    source={require('../../assets/animations/button-loading.json')} 
                    autoPlay
                    loop
                />
            :
                <>
                {props.icon &&
                    <props.icon style={{marginRight: 8, ...props.iconStyle}} stroke={(props.iconStyle && props.iconStyle.stroke) ? props.iconStyle.stroke : (props.type === 'line' ? (props.color ? props.color : Color.blue5) : 'white')}/>
                }
                <Text
                    type='b1'
                    weight='semibold'
                    style={{
                        textAlign: 'center',
                        color: props.type === 'line' ? (props.color ? props.color : Color.blue5) : 'white',
                        ...props.textStyle
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    adjustsFontSizeToFit={true}
                >
                    {props.title}
                </Text>
                </>
            }
        </Container>
    )
}
export default Button;
export interface Props extends PressableProps{
    loading?: boolean,
    textStyle?: TextStyle,
    style?: ViewStyle,
    title: string,
    color?: string,
    icon?: any,
    iconStyle?: any,
    type?: 'fill' | 'line'
}