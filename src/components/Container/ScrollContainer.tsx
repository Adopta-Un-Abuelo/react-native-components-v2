import React, { FC, useRef } from 'react';
import { Animated, Keyboard } from 'react-native';
import styled from 'styled-components/native';

import KeyboardAvoidingView from './KeyboardAvoidingView';
import ButtonBottom from '../Button/ButtonBottom';
import NavigationBar from '../Navigation/NavigationBar';
import Button from '../Button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../constants';

const SafeView = styled(SafeAreaView)`
    flex: 1;
    background-color: ${Color.background.neutral};
`
const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
`
const ScrollView = styled(Animated.ScrollView)`
    flex: 1;
`

const ScrollContainer: FC<Props> = props =>{
    const offset = useRef(new Animated.Value(0)).current;
    const { buttonProps, ...restProps } = props;
    const haveCustomHeader = props.navbarProps && props.navbarProps.Header;
    return(
        <SafeView 
            style={props.style}
            edges={props.edges ? props.edges : (haveCustomHeader ? ["bottom", "left", "right"] : ["bottom", "left", "right", "top"])}
        >
            <KeyboardAvoidingView>
                {props.navbarProps && (props.navbarProps.Header ?
                    <props.navbarProps.Header
                        animatedValue={offset}
                        {...props.navbarProps}
                    />
                :
                    <NavigationBar
                        animatedValue={offset}
                        {...props.navbarProps}
                    />
                )}
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <ScrollView
                        style={props.contentStyle}
                        scrollEventThrottle={1}
                        alwaysBounceHorizontal={false}
                        alwaysBounceVertical={false}
                        {...restProps}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: offset}}}],
                            { useNativeDriver: false }
                        )}
                    >
                        {props.children}
                    </ScrollView>
                </TouchableWithoutFeedback>
                {buttonProps &&
                    <ButtonBottom
                        {...buttonProps}
                    />
                }
                {props.secondButtonProps &&
                    <Button
                        style={{marginRight: 24, marginLeft: 24}}
                        {...props.secondButtonProps}
                    />
                }
            </KeyboardAvoidingView>
        </SafeView>
    )
}
export default ScrollContainer;
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
        style?: StyleMedia,
        Header?: any
    }
    buttonProps?: any,
    secondButtonProps?: any,
    contentStyle?: any,
    style?: any,
    edges?: Array<"top" | "right" | "left" | "bottom">
}