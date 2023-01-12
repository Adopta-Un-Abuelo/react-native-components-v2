import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAvoidingView from './KeyboardAvoidingView';
import ButtonBottom from '../Button/ButtonBottom';
import Button from '../Button/Button';
import NavigationBar from '../Navigation/NavigationBar';
import { Color } from '../../constants';

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
`
const SafeView = styled(SafeAreaView)<{color?: string}>`
    background-color: ${props => props.color ? props.color : Color.background.neutral};
    flex: 1;
`
const ViewContainer = styled.View`
    flex: 1;
`
const ChildrenContainer = styled.View`
    flex: 1;
    padding: 0px 24px;
`
const Container: FC<Props> = props =>{
    const haveCustomHeader = props.navbarProps && props.navbarProps.Header;
    return(
        <SafeView
            style={props.style}
            color={props.color}
            edges={props.edges ? props.edges : (haveCustomHeader ? ["bottom", "left", "right"] : ["bottom", "left", "right", "top"])}
        >
            <KeyboardAvoidingView
                color={props.color}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ViewContainer>
                        {props.navbarProps && (props.navbarProps.Header ?
                            <props.navbarProps.Header/>
                        :
                            <NavigationBar
                                {...props.navbarProps}
                            />
                        )}
                        <ChildrenContainer
                            style={props.contentStyle}
                        >
                            {props.children}
                        </ChildrenContainer>
                        {props.buttonProps &&
                            <ButtonBottom
                                {...props.buttonProps}
                            />
                        }
                        {props.secondButtonProps &&
                            <Button
                                style={{marginRight: 24, marginLeft: 24}}
                                {...props.secondButtonProps}
                            />
                        }
                    </ViewContainer>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeView>
    )
}
export default Container;
export interface Props{
    navbarProps?: {
        breadcrumbProps?:{
            steps: number,
            currentStep: number
        }
        hideBackButton?: boolean,
        hideBreadcrumb?: boolean,
        hideHeader?: boolean,
        title?: string,
        subtitle?: string,
        headerRight?: any,
        navigation: any,
        noHeader?: boolean,
        backButtonStyle?: any,
        Header?: any,
        backgroundColor?: string,
        textContainerStyle?: Object
    }
    style?: Object,
    color?: string,
    contentStyle?: any,
    children?: any,
    buttonProps?: {
        title: string,
        onPress: any,
        loading?: boolean,
        [key: string]: any,
        size?: 'big' | 'small' 
    },
    secondButtonProps?: {
        title: string,
        onPress: any,
        [key: string]: any
    }
    edges?: Array<"top" | "right" | "left" | "bottom">
}