import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { MoreHorizontal } from 'lucide-react-native';
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
        {props.icon ?
            <props.icon onPress={onButtonPress}/>
        :
            <ButtonImage
                icon={MoreHorizontal}
                style={props.style}
                onPress={onButtonPress}
            />
        }
        <SelectionModal
            visible={showModal}
            orientation={'bottom'}
            onDismiss={onModalDismiss}
            options={props.options}
            cancelString={props.cancelString}
            onPress={props.onPress}
        />
        </>
    )
}
export default MenuList;
export interface Props{
    icon?: any,
    style?: ViewStyle,
    options: Array<{
        id: string,
        title: string,
        icon?: any,
        disabled?: boolean
    }>
    onPress?: Function
    cancelString?: string
}