import React, { FC } from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { GestureResponderEvent, PressableProps } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.Pressable<{size?: 'normal' | 'small', type?: 'line' | 'fill', color?: string}>`
    flex-direction: row;
    height: ${props => props.size === 'small' ? '40px' : '58px'};
    border-radius: 36px;
    background-color: ${props => props.type === 'line' ? 'transparent' : (props.disabled ? Color.blue5+'50' : (props.color ? props.color : Color.blue5))};
    align-items: center;
    justify-content: center;
    border-width: ${props => props.type === 'line' ? '1px' : '0px'};
    border-color: ${props => props.disabled ? Color.blue5+'50' : (props.color ? props.color : Color.blue5)};
    padding: 0px 24px;
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
            size={props.size}
            type={props.type}
            color={props.color}
        >
            {props.icon &&
                <props.icon style={{marginLeft: -24, marginRight: 8, ...props.iconStyle}} stroke={props.iconStyle && props.iconStyle.stroke ? props.iconStyle.stroke : 'white'}/>
            }
            {props.loading ?
                <LottieView 
                    style={{width: 100}}
                    source={require('../../assets/animations/button-loading.json')} 
                    autoPlay
                    loop
                />
            :
                <Text
                    style={{
                        fontSize: props.size === 'small' ? 14 : 16,
                        color: props.color ? props.color : (props.type === 'line' ? Color.blue5 : 'white'),
                        fontFamily: 'Poppins-SemiBold',
                        opacity: props.disabled ? 0.5 : 1,
                        ...props.textStyle
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    adjustsFontSizeToFit={true}
                >
                    {props.title}
                </Text>
            }
        </Container>
    )
}
export default Button;
export interface Props extends PressableProps{
    loading?: boolean,
    textStyle?: any,
    style?: any,
    title: string,
    color?: string,
    icon?: any,
    iconStyle?: any,
    size?: 'normal' | 'small',
    type?: 'fill' | 'line'
}