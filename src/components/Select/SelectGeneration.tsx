import React, { FC, useState } from 'react';
import styled from 'styled-components/native';

import Text from '../Text/Text';
import Color from '../../constants/Color';
import { Info } from 'react-native-feather';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.Pressable`
    flex: 1;
    align-items: center;
`
const CellContent = styled.View<{selected: boolean, color?: string}>`
    height: 72px;
    width: 72px;
    border-radius: 12px;
    border-width: ${props => props.selected ? '0px' : '1px'};
    border-color: ${props => props.selected ? undefined : Color.blue3};
    background-color: ${props => props.selected ? Color.blue3+'60' : 'white'};
    align-items: center;
    justify-content: center;
`

const SelectGeneration: FC<Props> = props =>{

    const [ selectedItem, setSelectedItem ] = useState<{id: string, title?: string} | undefined>(props.defaultSelection ? {id: props.defaultSelection} : undefined);

    const onCellPress = (item: {id: string, title: string}) =>{
        setSelectedItem(item);
        props.onPress && props.onPress(item);
    }

    return(
        <Container
            style={{marginTop: 32}}
        >
            {props.options.map((item, index) =>(
                <Cell
                    key={'cell'+index}
                    onPress={() => onCellPress(item)}
                >
                    <CellContent
                        color={props.color}
                        selected={selectedItem?.id === item.id}
                    >
                        <Text
                            type='h2'
                            style={{color: Color.blue3}}
                        >
                            {item.title.substring(2, 4)}
                        </Text>
                    </CellContent>
                    <Container
                        style={{marginTop: 4, alignItems: 'center'}}
                    >
                        <Text
                            type='p1'
                            weight='medium'
                        >
                            {item.title}
                        </Text>
                        <Info 
                            height={14}
                            width={14}
                            stroke={Color.black}
                            style={{marginStart: 4}}
                        />
                    </Container>
                </Cell>
            ))}
        </Container>
    )
}
export default SelectGeneration;
export interface Props{
    onPress?: Function,
    color?: string,
    options: Array<{
        id: string,
        title: string,
        description: string
    }>
    defaultSelection?: string
}