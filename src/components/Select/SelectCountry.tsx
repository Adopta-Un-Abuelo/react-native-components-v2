import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TextStyle, ViewStyle } from 'react-native';
import { ChevronDown } from 'react-native-lucide';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import SelectCountryModal from '../Modal/SelectCountryModal';

const Container = styled.View`
    justify-content: center;
`
const SelectStyled = styled.Pressable`
    display: flex;
    flex-direction: row;
    z-index: 1000;
`
const Icon = styled.View`
    height: 24px;
    width: 24px;
`
const Arrow = styled.View`
    height: 7px;
    width: 12px;
    margin-left: 4px;
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
            style={{marginRight: 8, ...props.style}}
        >
            <SelectStyled
                style={{borderWidth: 0}}
                onPress={onSelectClick}
            >
                {selectedCountry && selectedCountry.icon &&
                    <Icon>
                        <selectedCountry.icon/>
                    </Icon>
                }
                <Arrow>
                    <ChevronDown color={Color.text.high}/>
                </Arrow>
                <Text
                    type='p1'
                    weight='medium'
                    style={{...props.textStyle, marginLeft: 16}}
                >
                    {props.title ? props.title : selectedCountry.prefix}
                </Text>
            </SelectStyled>
            <SelectCountryModal
                translation={props.translation}
                {...props.modalProps}
                orientation={'fullScreen'}
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
    translation: any,
    textStyle?: TextStyle,
    style?: ViewStyle,
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