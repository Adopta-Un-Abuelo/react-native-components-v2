import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Check } from 'react-native-lucide';
import { ViewStyle, TextStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.Pressable`
    flex: 1;
    flex-direction: row;
    align-items: center;
`
const CheckButton = styled.View<{selected: boolean, error?: boolean}>`
    background-color: ${props => props.selected ? Color.background.primary : Color.background.primaryLow};
    border-radius: 4px;
    height: 24px;
    width: 24px;
    align-items: center;
    justify-content: center;
    border-width: ${props => props.error ? '2px' : '1px'};
    border-color: ${props => props.error ? Color.status.color.error : (props.selected ? Color.line.primary : Color.line.primarySoft)};
`
const DataView = styled.View`
    flex: 1;
    flex-direction: column;
    margin-left: 16px;
`

const Checkbox = (props: Props) =>{

    const [ selection, setSelection ] = useState<{id: string} | undefined>(undefined);

    useEffect(() =>{
        if(props.defaultSelection) setSelection({id: props.defaultSelection});
    },[props.defaultSelection]);

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
                        onPress={() => onCellPress(item)}
                    >
                        <CheckButton
                            selected={selected}
                            error={props.error}
                        >
                            {selected &&
                                <Check height={18} width={18} color={Color.text.white} />
                            }
                        </CheckButton>
                        <DataView>
                            <Text
                                type='p1'
                                weight='medium'
                                style={{flex: 1, color: Color.text.primaryBlack, ...props.textStyle}}
                            >
                                {item.title}
                            </Text>
                            {item.subtitle &&
                                <Text
                                    type='c1'
                                    style={{flex: 1, color: Color.text.high, ...props.subtitleStyle}}
                                >
                                    {item.subtitle}
                                </Text>
                            }
                        </DataView>
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
    subtitleStyle?: TextStyle,
    cellStyle?: ViewStyle,
    options: Array<{
        id: string,
        title: string | Element,
        subtitle?: string
    }>
    defaultSelection?: string,
    onChange?: Function,
    error?: boolean
}