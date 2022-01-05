import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex: 1;
`
const Cell = styled.Pressable`
    flex: 1;
    padding: 18px 0px;
    flex-direction: row;
`
const CircleView = styled.View<{selected: boolean}>`
    height: 26px;
    width: 26px;
    background-color: ${props => props.selected ? 'white' : Color.gray6};
    border-radius: 200px;
    border-width: ${props => props.selected ? '1px' : '0px'};
    border-color: ${Color.blue3};
    justify-content: center;
    align-items: center;
`
const CircleSelect = styled.View`
    height: 16px;
    width: 16px;
    background-color: ${Color.blue3};
    border-radius: 200px;
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
                        <CircleView
                            selected={selected}
                        >
                            {selected && <CircleSelect/>}
                        </CircleView>
                        <Text
                            style={{marginLeft: 8, flex: 1}}
                        >
                            {item.title}
                        </Text>
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