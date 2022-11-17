import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.Pressable<{selected: boolean}>`
    flex: 1;
	flex-direction: column;
    align-items: center;
    justify-content: center;
	background-color: ${props => props.selected ? Color.background.primaryLow : 'transparent'};
    border: ${props => props.selected ? '2px solid '+Color.line.primary : '1px solid '+Color.line.soft};
	padding: 16px;
	border-radius: 12px;
    margin: 0px 4px;
`

const SelectVisit: FC<Props> = props =>{

    const [ selectedItem, setSelectedItem ] = useState<{id: string, title?: string} | undefined>(undefined);

    useEffect(() =>{
        if(props.selectedItem) {
            setSelectedItem({id: props.selectedItem});
        }
    },[props.selectedItem]);

    const onCellPress = (item: {id: string, title?: string}) =>{
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
            {props.options.map((item, index) => { 
                let selected = selectedItem?.id === item.id;
                return(
                    <Cell
                        key={'cell'+index}
                        onPress={() => onCellPress(item)}
                        selected={selected}
                    >
                        <item.icon />
                        <Text
                            type='p2'
                            style={{marginTop: 12}}
                        >
                            {item.title}
                        </Text>
                    </Cell>
                    )
                }
            )}
        </Container>
    )
}
export default SelectVisit;
export interface Props{
    onPress?: Function,
    options: Array<{
        id: string,
        title?: string,
        icon?: any
    }>,
    selectedItem?: string,
    style?: ViewStyle
}