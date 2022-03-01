import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';

import { ChevronDown } from 'react-native-lucide';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import SelectionModal from '../Modal/SelectionModal';

const Container = styled.View`
`
const SelectStyled = styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${Color.gray6};
    padding: 8px 16px;
    border-radius: 4px;
    background-color: white;
`
const Arrow = styled.View`
    height: 24px;
    width: 24px;
`
const Icon = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 8px;
`

const Select = (props: Props) =>{

    const [ showMenu, setShowMenu ] = useState<boolean>(false);
    const [ selectedItem, setSelectedItem ] = useState<{[key: string]: any}>(props.options && props.options[0]);

    useEffect(() =>{
        if(props.selectedItem){
            setSelectedItem(props.selectedItem)
        }
    }, [props.selectedItem]);

    const onSelectClick = () =>{
        setShowMenu(true);
        props.onShow && props.onShow();
    }

    const onModalDismiss = () =>{
        setShowMenu(false);
        props.onDismiss && props.onDismiss();
    }

    const onOptionClick = (option: Object) =>{
        setSelectedItem(option);
        setShowMenu(false);
        props.onChange && props.onChange(option);
    }

    return(
        <Container
            style={props.style}
        >
            <SelectStyled
                style={props.selectStyle}
                onPress={onSelectClick}
            >
                {selectedItem && selectedItem.icon && !props.hideIcon && 
                    <Icon>
                        <selectedItem.icon/>
                    </Icon>
                }
                {selectedItem && selectedItem.Icon && !props.hideIcon && 
                    <Icon>
                        {selectedItem.Icon}
                    </Icon>
                }
                {!props.hideTitle &&
                    <Text
                        style={{marginRight: 4, ...props.textStyle}}
                    >
                        {props.title ? props.title : selectedItem[props.titleValue]}
                    </Text>
                }
                <Arrow>
                    <ChevronDown color={Color.blue3}/>
                </Arrow>
            </SelectStyled>
            <SelectionModal
                {...props.modalProps}
                orientation={'bottom'}
                visible={showMenu}
                options={props.options}
                onPress={onOptionClick}
                onDismiss={onModalDismiss}
            />
        </Container>
    )
}
export default Select;
export interface Props{
    style?: ViewStyle,
    selectStyle?: ViewStyle,
    textStyle?: TextStyle,
    selectedItem?: {
        [key: string]: any
    },
    options: Array<{
        id: string,
        title: string,
        icon?: any,
        disabled?: boolean
    }>,
    title?: string,
    modalProps?: Object,
    onChange?: Function,
    titleValue: string,
    hideTitle?: boolean,
    hideIcon?: boolean,
    onShow?: Function,
    onDismiss?: Function
}