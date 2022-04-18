import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`
const RegularCell = styled.View<{backgroundColor?: string, color?: string}>`
    flex-direction: row;
    padding: 5px 12px;
    margin-right: 4px;
    border-radius: 1000px;
    margin-bottom: 8px;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: ${props => props.color ? props.color : Color.line.soft};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Color.background.neutral};
`
const SelectedCell = styled.View<{selected?: boolean}>`
    flex-direction: row;
    padding: 5px 12px;
    margin-right: 4px;
    border-radius: 1000px;
    margin-bottom: 8px;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: ${props => props.selected ? Color.text.full : Color.text.high};
    opacity: ${props => props.selected ? 1: 0.48};
`

const SelectChip: FC<Props> = props =>{
    return(
        <Container
            style={props.style}
        >
            {props.options.map((item, index)=>{
                if(props.selectedOptions) {
                    const selected = props.selectedOptions.some(obj => obj.id === item.id);
                    return(
                        <SelectedCell
                            key={'cell'+index}
                            selected={selected}
                            style={{...props.cellStyle}}
                        >
                            {item.icon &&
                                <item.icon height={18} width={18} color={item.color ? item.color : selected ? Color.text.full : Color.text.high} style={{marginRight: 6}} />
                            }
                            <Text
                                type='p2'
                                weight='medium'
                                style={{color: item.color ? item.color : selected ? Color.text.full : Color.text.high, ...props.textStyle}}
                            >
                                {props.locale === 'en' ? item.en : item.title}
                            </Text>
                        </SelectedCell>
                    )
                } else {
                    return(
                        <RegularCell
                            key={'cell'+index}
                            style={{...props.cellStyle}}
                            backgroundColor={item.backgroundColor}
                            color={item.color}
                        >
                            {item.icon &&
                                <item.icon height={18} width={18} color={item.color ? item.color : Color.text.full} style={{marginRight: 6}} />
                            }
                            <Text
                                type='p2'
                                weight='medium'
                                style={{color: item.color ? item.color : Color.text.full, ...props.textStyle}}
                            >
                                {props.locale === 'en' ? item.en : item.title}
                            </Text>
                        </RegularCell>
                    )
                }
            })}
        </Container>
    )
}
export default SelectChip;
export interface Props{
    style?: ViewStyle,
    cellStyle?: any,
    textStyle?: TextStyle,
    locale?: string,
    options: Array<{
        id: string,
        title: string,
        en?: string,
        icon?: any,
        color?: string,
        backgroundColor?: string
    }>,
    selectedOptions?: Array<{
        id: string
    }>
}