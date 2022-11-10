import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Check } from 'lucide-react-native';
import { ViewStyle, TextStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.Pressable`
    flex-direction: row;
`
const CheckButton = styled.View<{selected: boolean, error?: boolean}>`
    height: 24px;
    width: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border-width: 2px;
    border-color: ${props => props.error ? Color.status.color.error : (props.selected ? Color.line.primary : Color.line.primarySoft)};
    background-color: ${props => props.selected ? Color.background.primary : Color.background.neutral};
`

const Checkbox = (props: Props) =>{

    const [ selected, setSelected ] = useState<boolean>(false);

    const onCellPress = () =>{
        setSelected(!selected)
        props.onChange && props.onChange(!selected);
    }

    return(
        <Container
            style={props.style}
            onPress={onCellPress}
        >
            <CheckButton
                selected={selected}
                error={props.error}
            >
                {selected &&
                    <Check height={16} width={16} color={Color.text.white} />
                }
            </CheckButton>
            <Text
                type='c1'
                style={{flex: 1, marginLeft: 12, color: Color.text.high, ...props.textStyle}}
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