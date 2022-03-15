import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`
const Cell = styled.Pressable<{selected?: boolean, backgroundColor?: string, disabled?: boolean}>`
    flex-direction: row;
    padding: 5px 12px;
    margin-right: 4px;
    border-radius: 1000px;
    margin-bottom: 8px;
    justify-content: center;
    align-items: center;
    border-width: ${props => props.backgroundColor ? '0px' : props.selected ? '2px' : '1px'};
    border-color: ${props => props.selected ? Color.line.primary : Color.line.primarySoft};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : props.selected ? Color.status.primary.softDefault : Color.background.neutral};
    opacity: ${props => props.disabled ? 0.48 : 1};
`
const Column = styled.View`
    flex-direction: column;
`

const TagSelect: FC<Props> = props =>{

    const [ selectedItems, setSelectedItems ] = useState<Array<{id: string, title?: string, en?: string}>>([]);

    useEffect(() =>{
        if(props.defaultSelection) {
            const temp = props.defaultSelection.map(item =>({
                id: item
            }))
            setSelectedItems(temp);
        }
    },[]);

    useEffect(() =>{
        if(props.selectedItems) setSelectedItems(props.selectedItems);
    },[props.selectedItems]);

    const onPress = (item: {id: string, title: string, en?: string}) =>{
        if(props.singleSelection){
            setSelectedItems([item]);
            props.onPress && props.onPress(item);
            props.onChange && props.onChange(item);
        }
        else{
            if(!props.disabled){
                const tempArray = [...selectedItems];
                const index = tempArray.findIndex(e => e.id === item.id);
    
                if (index > -1) tempArray.splice(index, 1);
                else tempArray.push(item);
    
                setSelectedItems(tempArray);
                props.onPress && props.onPress(item);
                props.onChange && props.onChange(tempArray);
            }
        }
    }

    return(
        <Container
            style={props.style}
        >
            {props.options.map((item, index)=>{
                const selected= selectedItems.some(obj => obj.id === item.id);
                const disabled = props.disabledOptions ? props.disabledOptions.some(i => i.id === item.id) : false;
                return(
                    <Cell
                        key={'cell'+index}
                        onPress={() => onPress(item)}
                        selected={selected}
                        backgroundColor={item.backgroundColor}
                        disabled={disabled}
                        style={{...props.cellStyle}}
                    >
                        {item.icon ?
                            item.icon
                        : props.icon &&
                            <props.icon height={18} width={18} color={selected ? Color.text.primary : Color.text.high}/>
                        }
                        <Column
                            style={{marginLeft: (props.icon || item.icon) ? 8 : 0}}
                        >
                            <Text
                                type='p2'
                                weight='medium'
                                style={{color: item.color ? item.color : disabled ? Color.text.high : (selected ? Color.text.primary : Color.text.high), ...props.textStyle}}
                            >
                                {props.locale === 'en' ? item.en : item.title}
                            </Text>
                            {item.subtitle &&
                                <Text
                                    type='p1'
                                    style={{color: selected ? Color.text.white : Color.text.medium}}
                                >
                                    {item.subtitle}
                                </Text>
                            }
                        </Column>
                    </Cell>
                )
            })}
        </Container>
    )
}
export default TagSelect;
export interface Props{
    style?: ViewStyle,
    cellStyle?: any,
    textStyle?: TextStyle,
    options: Array<{
        id: string,
        title: string,
        en?: string,
        subtitle?: string,
        icon?: any,
        color?: string,
        backgroundColor?: string
    }>,
    disabledOptions?: Array<{
        id: string
    }>,
    selectedItems?: Array<{
        id: string,
        title: string,
        subtitle?: string
    }>,
    locale?: string,
    icon?: any,
    disabled?: boolean,
    singleSelection?: boolean,
    onPress?: Function,
    onChange?: Function,
    defaultSelection?: Array<string>
}