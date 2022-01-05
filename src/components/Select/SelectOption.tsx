import React, { FC, useState } from 'react';
import styled from 'styled-components/native';

import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.Pressable`
    flex: 1;
    align-items: center;
`
const CellContent = styled.View<{selected: boolean, color?: string}>`
    height: 80px;
    width: 80px;
    border-radius: 32px;
    background-color: ${props => props.selected ? (props.color ? props.color : Color.blue3) : (props.color ? props.color+'60' : Color.blue3+'60')};
    margin-bottom: 8px;
    align-items: center;
    justify-content: center;
`

const OptionSelect: FC<Props> = props =>{

    const [ selectedItem, setSelectedItem ] = useState<{id: string, title?: string} | undefined>(props.defaultSelection ? {id: props.defaultSelection} : undefined);

    const onCellPress = (item: {id: string, title: string}) =>{
        setSelectedItem(item);
        props.onPress && props.onPress(item);
    }

    return(
        <Container>
            {props.options.map((item, index) =>(
                <Cell
                    key={'cell'+index}
                    onPress={() => onCellPress(item)}
                >
                    <CellContent
                        color={props.color}
                        selected={selectedItem?.id === item.id}
                    >
                        <item.icon stroke={'white'} height={28} width={28}/>
                    </CellContent>
                    <Text>{item.title}</Text>
                </Cell>
            ))}
        </Container>
    )
}
export default OptionSelect;
export interface Props{
    onPress?: Function,
    color?: string,
    options: Array<{
        id: string,
        title: string,
        icon: any
    }>
    defaultSelection?: string
}