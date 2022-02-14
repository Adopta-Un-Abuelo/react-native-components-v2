import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Fuse from 'fuse.js'

import { Search } from 'react-native-feather';
import Modal from './Modal';
import Text from '../Text/Text';
import Color from '../../constants/Color';
import Input from '../Input/Input';

const Cell = styled.Pressable`
    flex-direction: row;
    align-items: center;
    margin-left: -24px;
    margin-right: -24px;
    padding: 16px 24px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${Color.gray5};
`
const Scroll = styled.ScrollView`
`

const SelectCountryModal: FC<Props> = props =>{

    const [ visible, setVisible ] = useState(props.visible);
    const [ countries, setCountries ] = useState(props.countries);
    const [ option, setOption ] = useState(undefined);
    const [ fuse, setFuse ] = useState(undefined);

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    useEffect(() => {
        //Init fuse search
        const options = {
            includeScore: true,
            keys: ['id', 'title']
        }
        setFuse(new Fuse(props.countries, options));
        setCountries(props.countries);
    },[props.countries]);

    const onPress = option =>{
        if(option && !option.disabled){
            setOption(option);
            setVisible(false);
        }
    }

    const onDismiss = () =>{
        setOption(undefined);
        props.onDismiss && props.onDismiss();
    }

    const onModalHide = () =>{
        if(option)
            props.onPress && props.onPress(option);
        props.onDismiss && props.onDismiss();
    }

    const onSearchChange = text =>{
        if(text){
            const result = fuse.search(text);
            const temp = result.map(item => item.item);
            setCountries(temp);
        }
        else
            setCountries(props.countries);
    }

    return(
        <Modal
            translation={props.translation}
            visible={visible}
            title={props.title}
            horientation={props.orientation}
            avoidKeyboard={true}
            onDismiss={onDismiss}
            onModalHide={onModalHide}
        >
            {props.showSearch &&
                <Input
                    style={{marginTop: 12, marginBottom: 12, height: 48}}
                    placeholder={props.translation ? props.translation.general_btn_search : 'Buscar'}
                    icon={Search}
                    hideTitle={true}
                    returnKeyType={'search'}
                    onChangeText={onSearchChange}
                />
            }
            <Scroll>
                {countries.map((item, index) =>(
                    <Cell
                        style={{opacity: 1}}
                        key={'callOption'+index}
                        onPress={() => onPress(item)}
                    >
                        {item.icon &&
                            <item.icon height={24} width={24} stroke={Color.blue3}/>
                        }
                        <Text
                            style={{marginLeft: (item.icon) ? 12 : 0}}
                        >
                            {props.locale === 'en' ? item.enPrefix : item.esPrefix}
                        </Text>
                    </Cell>
                ))}
            </Scroll>
        </Modal>
    )
}
export default SelectCountryModal;
export interface Props{
    translation: {
        [key: string]: any
    },
    onPress?: Function,
    onDismiss?: Function,
    visible: boolean,
    orientation?: 'top' | 'bottom' | 'center' | 'fullScreen',
    title?: string,
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
    showSearch?: boolean
}