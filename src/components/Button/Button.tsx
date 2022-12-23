import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { GestureResponderEvent, PressableProps, ViewStyle, TextStyle } from 'react-native';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.Pressable<{type?: 'line' | 'fill', backgroundColor?: string, size?: 'small' | 'big'}>`
    flex-direction: row;
    height: ${props => props.size === 'small' ? '44px' : '56px'};
    align-items: center;
    justify-content: center;
    border-radius:  ${props => props.size === 'small' ? '100px' : '100px'};
    background-color: ${props => props.type === 'line' ? 'transparent' : (props.backgroundColor ? props.backgroundColor : Color.status.primary.default)};
    border-color: ${props => props.backgroundColor ? props.backgroundColor : Color.status.primary.default};
    border-width: ${props => props.type === 'line' ? '1px' : '0px'};
    padding-left: 20px;
    padding-right: 20px;
    opacity: ${props => props.disabled ? 0.48 : 1};
`
const Gradient = styled(LinearGradient)`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 100px;
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
            size={props.size}
            backgroundColor={props.backgroundColor}
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
                    {props.gradient &&
                        <Gradient
                            colors={[props.gradient.colorStart, props.gradient.colorEnd]}
                            start={{x: 0, y: 0}} 
                            end={{x: 1, y: 1}}
                        />
                    }
                    {props.icon &&
                        <props.icon style={{marginRight: 16}} color={props.textColor ? props.textColor : Color.text.white}/>
                    }
                    <Text
                        type='b1'
                        weight='semibold'
                        style={{
                            textAlign: 'center',
                            color: props.textColor ? props.textColor : Color.text.white,
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
    textColor?: string,
    backgroundColor?: string,
    icon?: any,
    type?: 'fill' | 'line',
    size?: 'big' | 'small',
    gradient?: {
        colorStart: string,
        colorEnd: string
    }
}