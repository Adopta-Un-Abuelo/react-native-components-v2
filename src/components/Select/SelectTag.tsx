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
    padding: 8px 18px;
    margin-right: 12px;
    border-radius: 20px;
    margin-bottom: 12px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.backgroundColor ? (props.selected ? props.backgroundColor : props.backgroundColor+'10') : (props.selected ? Color.blue3 : Color.gray6)};
    opacity: ${props => props.disabled ? 0.6 : 1.0};
`
const Column = styled.View`
    flex-direction: column;
`

const TagSelect: FC<Props> = props =>{

    const [ selectedItems, setSelectedItems ] = useState<Array<{id: string, title?: string, en?: string}>>([]);
    const [ colorsArray, setColorsArray ] = useState<Array<string>>();

    useEffect(() =>{
        if(props.colors && props.colors.length > 0){
            const arrayLength = +(props.options.length/props.colors.length).toFixed(0);
            setColorsArray([].concat(...Array(arrayLength).fill(props.colors)));
        }
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
                const color = item.color ? item.color : (colorsArray && colorsArray.length > 0 ? colorsArray[index] : Color.blue3);
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
                            <props.icon height={18} width={18} stroke={selected ? 'white' : color}/>
                        }
                        <Column
                            style={{marginLeft: (props.icon || item.icon) ? 8 : 0}}
                        >
                            <Text
                                type='p2'
                                weight='medium'
                                style={{color: disabled ? Color.gray3 : (selected ? 'white' : color), ...props.textStyle}}
                            >
                                {props.locale === 'en' ? item.en : item.title}
                            </Text>
                            {item.subtitle &&
                                <Text
                                    style={{color: selected ? 'white' : Color.gray3, fontSize: 12}}
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
    colors?: Array<string>,
    disabled?: boolean,
    singleSelection?: boolean,
    onPress?: Function,
    onChange?: Function,
    defaultSelection?: Array<string>
}