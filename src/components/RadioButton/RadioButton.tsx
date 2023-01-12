import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    
`
const Cell = styled.Pressable`
    padding: 18px 0px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.line.soft};
`
const CircleView = styled.View<{selected: boolean}>`
    height: 26px;
    width: 26px;
    background-color: ${props => props.selected ? Color.background.primary : Color.background.neutral};
    border-radius: 100px;
    border-width: 2px;
    border-color: ${props => props.selected ? Color.background.primary : Color.line.primarySoft};
    justify-content: center;
    align-items: center;
`

const RadioButton: FC <Props> = props =>{

    const [ selection, setSelection ] = useState<{id: string, title: string} | undefined>(undefined);

    const onPress = item =>{
        setSelection(item);
        props.onPress && props.onPress(item);
    }

    return(
        <Container
            style={props.style}
        >
            {props.options.map((item, index) =>{
                const selected = (selection && selection.id === item.id) ? true : false;
                return (
                    <Cell
                        key={'radio'+index}
                        onPress={() => onPress(item)}
                        style={props.cellStyle}
                    >
                        <Text
                            type='p1'
                            weight='medium'
                            style={{marginRight: 18, flex: 1}}
                        >
                            {item.title}
                        </Text>
                        <CircleView
                            selected={selected}
                        >
                            {selected && <Check width={18} height={18} strokeWidth={3} color={Color.text.white}/>}
                        </CircleView>
                    </Cell>
                )
            })}
        </Container>
    )
}
export default RadioButton;
export interface Props{
    style?: ViewStyle,
    cellStyle?: ViewStyle,
    options: Array<{
        id: string,
        title: string
    }>,
    onPress?: Function
}