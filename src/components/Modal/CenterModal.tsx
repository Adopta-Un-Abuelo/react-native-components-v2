import React, {FC, useEffect, useState} from "react";
import styled from 'styled-components/native';

import Modal from './Modal';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { Color } from '../../constants';

const ContentView = styled.Pressable`
    align-items: center;
    padding-top: 12px;
    padding-bottom: 24px;
`
const ButtonView = styled.View`
    flex-direction: row;
    margin-top: 32px;
`

const CenterModal: FC <Props> = props =>{

    const [ visible, setVisible ] = useState(props.visible);
    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    const onDismiss = () =>{
        props.onDismiss && props.onDismiss();
    }

    const onPress = () =>{
        props.onPress && props.onPress();
    }

    return(
        <Modal
            translation={props.translation}
            visible={visible}
            showTopClose={false}
            showBottomClose={false}
            onDismiss={() => onDismiss()}
            onModalHide={() => onDismiss()}
        >
            <ContentView>
                {props.icon &&
                    <props.icon height={48} width={48} style={{marginTop: 16}} color={Color.text.full} />
                }
                <Text
                    type='h6'
                    weight='semibold'
                    style={{textAlign: 'center', marginTop: 16}}
                >
                    {props.title}
                </Text>
                {props.subtitle && 
                    <Text
                        type='p2'
                        style={{color: Color.text.high, marginTop: 4, textAlign: 'center'}}
                    >
                        {props.subtitle}
                    </Text>
                }
                <ButtonView>
                    <Button
                        style={{flex: 1, marginRight: 4, backgroundColor: Color.background.soft}}
                        color={Color.text.high}
                        title={props.translation.general_btn_cancel}
                        onPress={onDismiss}
                    />
                    <Button
                        style={{flex: 1, marginLeft: 4}}
                        title={props.buttonTitle}
                        onPress={onPress}
                    />
                </ButtonView>
            </ContentView>
        </Modal>
    )
}
export default CenterModal;
export interface Props{
    translation: {
		[key: string]: any
	},
    visible: boolean,
    onDismiss: Function,
    onPress: Function,
    title: string,
    subtitle?: string,
    buttonTitle: string,
    icon?: any
}