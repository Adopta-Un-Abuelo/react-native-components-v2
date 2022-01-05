import React, { FC } from 'react';
import { Platform } from 'react-native'
import styled from 'styled-components/native';

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: white;
`
const ViewContainer = styled.View`
	flex: 1;
`
const KeyboardAvoidingComponent: FC<Props> = props =>{
    return(
        <KeyboardAvoidingView
            keyboardVerticalOffset={props.keyboardVerticalOffset ? props.keyboardVerticalOffset : 0}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={props.style}
        >
            <ViewContainer>
                {props.children}
            </ViewContainer>
        </KeyboardAvoidingView>
    )
}
export default KeyboardAvoidingComponent;
export interface Props{
    style?: Object,
    keyboardVerticalOffset?: number
}