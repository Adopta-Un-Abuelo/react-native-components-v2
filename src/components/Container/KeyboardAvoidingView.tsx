import React, { FC } from 'react';
import { Platform } from 'react-native'
import styled from 'styled-components/native';
import { Color } from '../../constants';

const KeyboardAvoidingView = styled.KeyboardAvoidingView<{color?: string}>`
    flex: 1;
    background-color: ${props => props.color ? props.color : Color.background.neutral};
`
const ViewContainer = styled.View`
	flex: 1;
`
const KeyboardAvoidingComponent: FC<Props> = props =>{
    return(
        <KeyboardAvoidingView
            color={props.color}
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
    color?: string,
    children?: any,
    keyboardVerticalOffset?: number
}