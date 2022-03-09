import React, { FC, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Modal from './Modal';

const WebModal: FC<Props> = props =>{

    const [ visible, setVisible ] = useState(props.visible);
    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    const onDismiss = () =>{
        props.onDismiss && props.onDismiss();
    }

    return(
        <Modal
            visible={visible}
            orientation={'fullScreen'}
            showTopClose={true}
            title={props.title}
            showBottomClose={false}
            onDismiss={onDismiss}
            onModalHide={onDismiss}
        >
            <WebView
                source={{ uri: props.url }}
            />
        </Modal>
    )
}
export default WebModal;
export interface Props{
    title: string,
    visible: boolean,
    url: string,
    onDismiss: Function
}