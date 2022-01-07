import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { GestureResponderEvent, PressableProps, ViewStyle, TextStyle } from 'react-native';

import { ChevronRight } from 'react-native-feather';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.Pressable<{type?: 'line' | 'fill', color?: string, showIcon: boolean}>`
    flex-direction: row;
    height: 58px;
    border-radius: 36px;
    background-color: ${props => props.type === 'line' ? 'transparent' : (props.color ? props.color : Color.blue5)};
    align-items: center;
    justify-content: center;
    border-width: ${props => props.type === 'line' ? '1px' : '0px'};
    border-color: ${props => props.color ? props.color : Color.blue5};
    padding: ${props => props.showIcon ? '0px 14px 0px 22px' : '0px 22px'};
    opacity: ${props => props.disabled ? 0.5 : 1};
    align-self: flex-end;
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
            showIcon={!props.hideIcon && props.size === 'small'}
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
                <>
                <Text
                    style={{
                        flex: props.size === 'small' ? 0 : 1,
                        textAlign: 'center',
                        color: props.type === 'line' ? (props.color ? props.color : Color.blue5) : 'white',
                        fontFamily: 'Poppins-SemiBold',
                        ...props.textStyle
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    adjustsFontSizeToFit={true}
                >
                    {props.title}
                </Text>
                {!props.hideIcon && props.size === 'small' &&
                    <ChevronRight stroke={props.type === 'line' ? (props.color ? props.color : Color.blue5) : 'white'}/>
                }
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
    type?: 'fill' | 'line',
    size?: 'normal' | 'small',
    hideIcon?: boolean
}