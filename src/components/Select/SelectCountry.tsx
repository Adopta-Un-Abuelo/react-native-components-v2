import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TextStyle, ViewStyle } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import SelectCountryModal from '../Modal/SelectCountryModal';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

const Container = styled.View`
    justify-content: center;
`
const SelectStyled = styled.Pressable`
    display: flex;
    flex-direction: row;
    z-index: 1000;
`
const Arrow = styled.View`
    height: 7px;
    width: 12px;
    margin-left: 4px;
`

const SelectCountry = (props: Props) =>{

    const [ countries, setCountries ] = useState([]);
    const [ showMenu, setShowMenu ] = useState<boolean>(false);
    const [ selectedCountry, setSelectedCountry ] = useState<{[key: string]: any}>();

    useEffect(() =>{
        //Init fuse.js search
        if(props.countries){
            const tempVar = props.locale === 'en' ? 'enCountry' : 'esCountry';
            const temp = props.countries.sort((a, b) => a[tempVar].localeCompare(b[tempVar]));
            const selectedCountry = temp.filter(item => item.countryCode === (props.selectedCountry ? props.selectedCountry : 'ES'));
            setSelectedCountry({
                ...selectedCountry[0],
                flag: getUnicodeFlagIcon(selectedCountry[0].countryCode)
            });
            setCountries(temp);
        }
    },[props.countries]);

    useEffect(() =>{
        if(props.selectedCountry){
            setSelectedCountry({
                ...props.selectedCountry,
                flag: getUnicodeFlagIcon(props.selectedCountry.countryCode)
            });
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

    const onOptionClick = (option: any) =>{
        setSelectedCountry({
            ...option,
            flag: getUnicodeFlagIcon(option.countryCode)
        });
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
                {selectedCountry &&
                    <Text>
                        {selectedCountry.flag}
                    </Text>
                }
                <Arrow>
                    <ChevronDown color={Color.text.high}/>
                </Arrow>
                <Text
                    type='p1'
                    weight='medium'
                    style={{...props.textStyle, marginLeft: 16}}
                >
                    {selectedCountry ? selectedCountry.prefix : ' '}
                </Text>
            </SelectStyled>
            <SelectCountryModal
                {...props.modalProps}
                orientation={'fullScreen'}
                visible={showMenu}
                countries={countries}
                locale={props.locale}
                onPress={onOptionClick}
                onDismiss={onModalDismiss}
            />
        </Container>
    )
}
export default SelectCountry;
export interface Props{
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
        countryCode: string
    }>,
    locale: string,
    modalProps?: Object,
    defaultCountry?: string,
    onChange?: Function,
    onShow?: Function,
    onDismiss?: Function
}