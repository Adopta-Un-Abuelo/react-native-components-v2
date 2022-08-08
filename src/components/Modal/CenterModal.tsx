import React, {FC, useEffect, useState} from "react";
import styled from 'styled-components/native';
import Modal from './Modal';
import Text from '../Text/Text';
import { Color } from '../../constants';

const ContentView = styled.Pressable`
    align-items: center;
    padding-top: 12px;
`
const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: 32px;
`
const ButtonView = styled.Pressable`
    flex: 1
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
                <ButtonContainer>
                    <ButtonView
                        onPress={onDismiss}
                    >
                        <Text
                            type='b1'
                            weight='medium'
                            style={{textAlign: 'center'}}
                        >
                            {props.translation.general_btn_cancel}
                        </Text>
                    </ButtonView>
                    <ButtonView
                        onPress={onPress}
                    >
                        <Text
                            type='b1'
                            weight='medium'
                            style={{textAlign: 'center', color: props.buttonColor ? props.buttonColor : Color.text.primary}}
                        >
                            {props.buttonTitle}
                        </Text>
                    </ButtonView>
                </ButtonContainer>
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
    buttonColor?: string,
    icon?: any,
}