import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
`
const Cell = styled.Pressable<{selected: boolean}>`
    height: 82px;
    width: 100%;
    padding: 16px;
    flex-direction: row;
    align-items: center;
    border-radius: 12px;
    border-width: ${props => props.selected ? '2px' : '1px'};
    border-color: ${props => props.selected ? Color.line.primary : Color.line.soft};
    background-color: ${props => props.selected ? Color.background.primaryLow : Color.text.white};
    margin-top: 8px;
`

const OptionSelect: FC<Props> = props =>{

    const [ selectedItem, setSelectedItem ] = useState<{id: string, title?: string} | undefined>(props.defaultSelection ? {id: props.defaultSelection} : undefined);

    const onCellPress = (item: {id: string, title: string}) =>{
        if(selectedItem && selectedItem.id === item.id){
            setSelectedItem(undefined);
            props.onPress && props.onPress(undefined);
        } else{
            setSelectedItem(item);
            props.onPress && props.onPress(item);
        }
    }

    return(
        <Container
            style={props.style}
        >
            {props.options.map((item, index) =>(
                <Cell
                    key={'cell'+index}
                    onPress={() => onCellPress(item)}
                    selected={selectedItem?.id === item.id}
                >
                    <item.icon color={Color.text.full} />
                    <Text
                        type='p1'
                        weight='semibold'
                        style={{marginLeft: 16}}
                    >
                        {item.title}
                    </Text>
                </Cell>
            ))}
        </Container>
    )
}
export default OptionSelect;
export interface Props{
    onPress?: Function,
    options: Array<{
        id: string,
        title: string,
        icon: any
    }>,
    defaultSelection?: string,
    style?: ViewStyle
}