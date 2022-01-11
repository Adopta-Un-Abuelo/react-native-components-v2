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
const Icon = styled.View`
    height: 24px;
    width: 24px;
    margin-right: 8px;
`
const SelectionModal: FC<Props> = props =>{

    const [ visible, setVisible ] = useState(props.visible);
    const [ options, setOptions ] = useState(props.options);
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
        setFuse(new Fuse(props.options, options));
        setOptions(props.options);
    },[props.options]);

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
            setOptions(temp);
        }
        else
            setOptions(props.options);
    }

    return(
        <Modal
            visible={visible}
            title={props.title}
            horientation={props.horientation}
            avoidKeyboard={true}
            onDismiss={onDismiss}
            onModalHide={onModalHide}
        >
            {props.showSearch &&
                <Input
                    style={{marginTop: 12, marginBottom: 12, height: 48}}
                    placeholder='Buscar'
                    icon={Search}
                    hideTitle={true}
                    returnKeyType={'search'}
                    onChangeText={onSearchChange}
                />
            }
            <Scroll>
                {options.map((item, index) =>(
                    <Cell
                        style={{opacity: item.disabled ? 0.5 : 1}}
                        key={'callOption'+index}
                        onPress={() => onPress(item)}
                    >
                        {item.icon &&
                            <item.icon height={24} width={24} stroke={Color.blue3}/>
                        }
                        {item.Icon &&
                            <Icon>
                                {item.Icon}
                            </Icon>
                        } 
                        <Text
                            style={{marginLeft: (item.Icon || item.icon) ? 12 : 0}}
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
    }>,
    showSearch?: boolean
}