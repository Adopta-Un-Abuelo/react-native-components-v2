import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { Check } from 'react-native-feather';
import { ViewStyle, TextStyle } from 'react-native';

import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`
const CheckButton = styled.Pressable<{selected: boolean, error?: boolean}>`
    margin-right: 12px;
    background-color: ${props => props.selected ? Color.blue3 : Color.gray6};
    border-radius: 8px;
    height: 32px;
    width: 32px;
    align-items: center;
    justify-content: center;
    border-width: ${props => props.error ? '2px' : '0px'};
    border-color: ${Color.error};
`

const Checkbox: FC<Props> = props =>{

    const [ selection, setSelection ] = useState<{id: string} | undefined>(undefined);

    const onCellPress = (item: {id: string}) =>{
        if(selection && item.id === selection.id){
            setSelection(undefined);
            props.onChange && props.onChange(undefined);
        }
        else{
            setSelection(item);
            props.onChange && props.onChange(item);
        }
    }

    return(
        <Container
            style={props.style}
        >
            {props.options.map((item, index) =>{
                const selected = selection?.id === item.id;
                return (
                    <Cell
                        style={props.cellStyle}
                        key={'checkbox'+index}
                    >
                        <CheckButton
                            selected={selected}
                            error={props.error}
                            onPress={() => onCellPress(item)}
                        >
                            {selected &&
                                <Check stroke={'white'} />
                            }
                        </CheckButton>
                        <Text
                            style={{flex: 1, ...props.textStyle}}
                        >
                            {item.title}
                        </Text>
                    </Cell>
                )
            })}
        </Container>
    )
}
export default Checkbox;
export interface Props{
    style?: ViewStyle,
    textStyle?: TextStyle,
    cellStyle?: ViewStyle,
    options: Array<{
        id: string,
        title: string | Element,
        subtitle?: string
    }>
    onChange?: Function,
    error?: boolean
}