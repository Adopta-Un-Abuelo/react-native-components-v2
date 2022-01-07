import React, { FC, useState } from 'react';
import { Menu } from 'react-native-feather';

import ButtomImage from '../Button/ButtonImage';
import SelectionModal from '../Modal/SelectionModal';

const MenuList: FC <Props> = props =>{

    const [ showModal, setShowModal ] = useState(false);

    const onButtonPress = () =>{
        setShowModal(true);
    }

    const onModalDismiss = () =>{
        setShowModal(false);
    }

    return(
        <>
        <ButtomImage
            icon={Menu}
            style={props.style}
            onPress={onButtonPress}
            height={24}
            width={24}
        />
        <SelectionModal
            visible={showModal}
            horientation={'bottom'}
            onDismiss={onModalDismiss}
            options={props.options}
            onPress={props.onPress}
        />
        </>
    )
}
export default MenuList;
export interface Props{
    style?: Object,
    options: Array<{
        id: string,
        title: string,
        icon?: any,
        disabled?: boolean
    }>
    onPress?: Function
}