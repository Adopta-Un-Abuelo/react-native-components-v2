import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import KeyboardAvoidingView from './KeyboardAvoidingView';
import ButtonBottom from '../Button/ButtonBottom';
import Button from '../Button/Button';
import NavigationBar from '../Navigation/NavigationBar';

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
`
const SafeView = styled(SafeAreaView)`
    flex: 1;
`
const ViewContainer = styled.View`
    flex: 1;
`
const Container: FC<Props> = props =>{
    const haveCustomHeader = props.navbarProps && props.navbarProps.Header;
    return(
        <SafeView
            style={props.style}
            edges={props.edges ? props.edges : (haveCustomHeader ? ["bottom", "left", "right"] : ["bottom", "left", "right", "top"])}
        >
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ViewContainer>
                        {props.navbarProps && (props.navbarProps.Header ?
                            <props.navbarProps.Header/>
                        :
                            <NavigationBar
                                {...props.navbarProps}
                            />
                        )}
                        {props.children}
                        {props.buttonProps &&
                            <ButtonBottom
                                size={props.buttonSize}
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
        Header?: any
    }
    title?: string,
    subtitle?: string,
    buttonSize?: 'big' | 'small' 
    style?: Object,
    contentStyle?: Object,
    buttonProps?: {
        title: string,
        onPress: any,
        loading?: boolean,
        [key: string]: any
    },
    secondButtonProps?: {
        title: string,
        onPress: any,
        [key: string]: any
    }
    edges?: Array<"top" | "right" | "left" | "bottom">
}