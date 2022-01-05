import React, { FC } from 'react';
import { WebView } from 'react-native-webview';

import Modal from './Modal';

const WebModal: FC<Props> = props =>{

    return(
        <Modal
            {...props}
            horientation={'fullScreen'}
            style={{paddingRight: 0, paddingLeft: 0, paddingTop: 48}}
        >
            <WebView
                source={{ uri: props.url }}
            />
        </Modal>
    )
}
export default WebModal;
export interface Props{
    visible: boolean,
    url: string,
    onDismiss: Function
}