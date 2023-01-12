import React, { useRef } from 'react';
import { ViewStyle, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const Button = styled(AnimatedTouchable)`
	justify-content: center;
	align-items: center;
    height: 36px;
    width: 36px;
`

const ButtonImage = (props: Props) =>{

    const scaleAnim: any = useRef(new Animated.Value(1)).current;

    const { icon, ...restProps } = props;

    const onButtonPress = () =>{
        props.onPress();
        Animated.timing(scaleAnim, {
            toValue: 0.90,
            duration: 100,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false
            }).start();
        });
    }

    return(
        <Button
            {...restProps}
            style={[props.style, {
                transform: [{scale: scaleAnim}]
            }]}
            onPress={onButtonPress}
        >
            {icon &&
                <props.icon 
                    height={props.iconProps?.height ? props.iconProps.height : 24}
                    width={props.iconProps?.width ? props.iconProps.width : 24}
                    strokeWidth={props.iconProps?.strokeWidth ? props.iconProps.strokeWidth : 1}
                    color={props.selected ? (props.colorFill ? props.colorFill : Color.text.full) : props.color ? props.color : Color.text.full}
                    fill={props.selected ? (props.colorFill ? props.colorFill : Color.text.full) : 'transparent'}
                />
            }
            {props.Icon && props.Icon}
        </Button>
    )
}
export default ButtonImage;
export interface Props{
    icon?: any,
    iconProps?: {
        height?: number,
        width?: number,
        strokeWidth?: number
    }
    Icon?: any,
    onPress: () => void,
    style?: ViewStyle,
    color?: string,
    colorFill?: string,
    selected?: boolean,
    gradient?: {
        colorStart: string,
        colorEnd: string
    }
}