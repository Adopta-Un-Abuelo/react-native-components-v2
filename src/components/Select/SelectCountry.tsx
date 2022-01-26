import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';

import { ChevronDown } from 'react-native-feather';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import SelectCountryModal from '../Modal/SelectCountryModal';

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

const SelectCountry = (props: Props) =>{

    const [ showMenu, setShowMenu ] = useState<boolean>(false);
    const [ selectedCountry, setSelectedCountry ] = useState<{[key: string]: any}>(props.countries && props.countries[0]);

    useEffect(() =>{
        if(props.selectedCountry){
            setSelectedCountry(props.selectedCountry)
        }
    }, [props.selectedCountry]);

    const onSelectClick = () =>{
        setShowMenu(true);
        props.onShow && props.onShow();
    }

    const onModalDismiss = () =>{
        setShowMenu(false);
        props.onDismiss && props.onDismiss();
    }

    const onOptionClick = (option: Object) =>{
        setSelectedCountry(option);
        setShowMenu(false);
        props.onChange && props.onChange(option);
    }

    return(
        <Container
            style={{marginRight: 8}}
        >
            <SelectStyled
                style={{borderWidth: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0, backgroundColor: 'transparent'}}
                onPress={onSelectClick}
            >
                {selectedCountry && selectedCountry.icon &&
                    <Icon>
                        <selectedCountry.icon/>
                    </Icon>
                }
                <Text
                    style={{marginRight: 4, ...props.textStyle}}
                >
                    {props.title ? props.title : selectedCountry.prefix}
                </Text>
                <Arrow>
                    <ChevronDown stroke={Color.blue3}/>
                </Arrow>
            </SelectStyled>
            <SelectCountryModal
                translation={props.translation}
                {...props.modalProps}
                orientation={'bottom'}
                visible={showMenu}
                countries={props.countries}
                locale={props.locale}
                onPress={onOptionClick}
                onDismiss={onModalDismiss}
            />
        </Container>
    )
}
export default SelectCountry;
export interface Props{
    translation: {
        [key: string]: any
    },
    textStyle?: TextStyle,
    selectedCountry?: {
        [key: string]: any
    },
    countries: Array<{
        id: string,
        prefix: string,
        esCountry: string,
        enCountry: string,
        esPrefix: string,
        enPrefix: string,
        icon?: any
    }>,
    locale: string,
    title?: string,
    modalProps?: Object,
    onChange?: Function,
    onShow?: Function,
    onDismiss?: Function
}