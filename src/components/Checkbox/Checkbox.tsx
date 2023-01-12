import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Check } from 'lucide-react-native';
import { ViewStyle, TextStyle, Animated } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.Pressable`
    flex-direction: row;
`
const CheckButton = styled(Animated.View)<{selected: boolean, error?: boolean}>`
    height: 24px;
    width: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border-width: 2px;
    border-color: ${props => props.error ? Color.status.color.error : (props.selected ? Color.line.primary : Color.line.primarySoft)};
`
const IconView = styled(Animated.View)`
`

const Checkbox = (props: Props) =>{

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const backgroundAnim = useRef(new Animated.Value(0)).current;

    const [ selected, setSelected ] = useState<boolean>(false);

    const onCellPress = () =>{
        props.onChange && props.onChange(!selected);
        if(selected){
            Animated.timing(backgroundAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start();
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start(() =>{
                setSelected(false)
            });
        }
        else{
            setSelected(true);
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            }).start();
            Animated.timing(backgroundAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            }).start();
        }
    }

    return(
        <Container
            style={props.style}
            onPress={onCellPress}
        >
            <CheckButton
                selected={selected}
                error={props.error}
                style={{
                    backgroundColor: backgroundAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['transparent', (selected ? Color.background.primary : Color.background.neutral)]
                    })
                }}
            >
                <IconView
                    style={{
                        transform: [{scale: scaleAnim}]
                    }}
                >
                    <Check height={18} width={18} strokeWidth={3} color={Color.text.white} />
                </IconView>
            </CheckButton>
            <Text
                type='c1'
                style={{flex: 1, marginLeft: 12, marginTop: 2, color: Color.text.full, ...props.textStyle}}
            >
                {props.title}
            </Text>
        </Container>
    )
}
export default Checkbox;
export interface Props{
    style?: ViewStyle,
    textStyle?: TextStyle,
    title: string,
    onChange?: Function,
    error?: boolean
}