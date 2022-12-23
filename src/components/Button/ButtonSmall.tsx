import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { GestureResponderEvent, PressableProps, ViewStyle, TextStyle } from 'react-native';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.Pressable<{type?: 'line' | 'fill', color?: string, size?: 'small' | 'big'}>`
    flex-direction: row;
    height: 44px;
    border-radius: 100px;
    background-color: ${props => props.type === 'line' ? 'transparent' : (props.color ? props.color : Color.status.primary.default)};
    align-items: center;
    justify-content: center;
    border-width: ${props => props.type === 'line' ? '1px' : '0px'};
    border-color: ${props => props.color ? props.color : Color.status.primary.default};
    padding: 0px 20px;
    opacity: ${props => props.disabled ? 0.48 : 1};
    align-self: flex-start;
`
const Gradient = styled(LinearGradient)`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 12px;
`

const ButtonSmall = (props: Props) =>{

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
                    style={{width: 65}}
                    source={require('../../assets/animations/button-loading.json')} 
                    autoPlay
                    loop
                />
            :
                <>
                    {props.gradient &&
                        <Gradient
                            colors={[props.gradient.colorStart, props.gradient.colorEnd]}
                            start={{x: 0, y: 0}} 
                            end={{x: 1, y: 1}}
                        />
                    }
                    {props.icon &&
                        <props.icon style={{marginRight: 8, ...props.iconStyle}} color={(props.iconStyle && props.iconStyle.stroke) ? props.iconStyle.stroke : (props.type === 'line' ? (props.color ? props.color : Color.text.primary) : Color.text.white)}/>
                    }
                    <Text
                        type='b1'
                        weight='semibold'
                        style={{
                            textAlign: 'center',
                            color: props.type === 'line' ? (props.color ? props.color : Color.status.primary.default) : Color.text.white,
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
export default ButtonSmall;
export interface Props extends PressableProps{
    loading?: boolean,
    textStyle?: TextStyle,
    style?: ViewStyle,
    title: string,
    color?: string,
    icon?: any,
    iconStyle?: any,
    type?: 'fill' | 'line',
    gradient?: {
        colorStart: string,
        colorEnd: string
    }
}