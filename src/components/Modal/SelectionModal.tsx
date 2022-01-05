import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Modal from './Modal';
import Text from '../Text/Text';
import Color from '../../constants/Color';

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
const Icon = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 8px;
`
const SelectionModal: FC<Props> = props =>{

    const [ visible, setVisible ] = useState(props.visible);
    const [ option, setOption ] = useState(undefined);

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

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

    return(
        <Modal
            visible={visible}
            title={props.title}
            horientation={props.horientation}
            onDismiss={onDismiss}
            onModalHide={onModalHide}
        >
            <Scroll>
                {props.options.map((item, index) =>(
                    <Cell
                        style={{opacity: item.disabled ? 0.5 : 1}}
                        key={'callOption'+index}
                        onPress={() => onPress(item)}
                    >
                        {item.icon &&
                            <item.icon stroke={Color.blue3}/>
                        }
                    {item.Icon &&
                            <Icon>
                                {item.Icon}
                            </Icon>
                    } 
                        <Text
                            style={{marginLeft: 12}}
                        >
                            {item.title}
                        </Text>
                    </Cell>
                ))}
            </Scroll>
        </Modal>
    )
}
export default SelectionModal;
export interface Props{
    onPress?: Function,
    onDismiss?: Function,
    visible: boolean,
    horientation?: 'top' | 'bottom' | 'center' | 'fullScreen',
    title?: string,
    options: Array<{
        id: string,
        title: string,
        icon?: any,
        Icon?: any,
        disabled?: boolean
    }>
}