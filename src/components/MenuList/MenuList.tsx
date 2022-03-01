import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { Menu } from 'react-native-lucide';

import ButtonImage from '../Button/ButtonImage';
import SelectionModal from '../Modal/SelectionModal';

const MenuList = (props: Props) =>{

    const [ showModal, setShowModal ] = useState(false);

    const onButtonPress = () =>{
        setShowModal(true);
    }

    const onModalDismiss = () =>{
        setShowModal(false);
    }

    return(
        <>
        <ButtonImage
            icon={Menu}
            style={props.style}
            onPress={onButtonPress}
            height={24}
            width={24}
        />
        <SelectionModal
            visible={showModal}
            orientation={'bottom'}
            onDismiss={onModalDismiss}
            options={props.options}
            onPress={props.onPress}
        />
        </>
    )
}
export default MenuList;
export interface Props{
    style?: ViewStyle,
    options: Array<{
        id: string,
        title: string,
        icon?: any,
        disabled?: boolean
    }>
    onPress?: Function
}