import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Text from '../Text/Text';
import Color from '../../constants/Color';
import { ViewStyle } from 'react-native';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.Pressable<{selected: boolean}>`
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    border-width: ${props => props.selected ? '2px' : '1px'};
    border-color: ${props => props.selected ? Color.line.primary : Color.line.soft};
    background-color: ${props => props.selected ? Color.background.primaryLow : Color.text.white};
    align-items: center;
    justify-content: center;
    margin-horizontal: 4px;
`

const OptionSelect: FC<Props> = props =>{

    const [ selectedItem, setSelectedItem ] = useState<{id: string, title?: string} | undefined>(undefined);

    useEffect(() =>{
        if(props.defaultSelection) {
            setSelectedItem({id: props.defaultSelection});
        }
    },[props.defaultSelection]);

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
                        type='p2'
                        style={{textAlign: 'center', marginTop: 12}}
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
    style?: ViewStyle,
    onPress?: Function,
    options: Array<{
        id: string,
        title: string,
        icon: any
    }>
    defaultSelection?: string
}