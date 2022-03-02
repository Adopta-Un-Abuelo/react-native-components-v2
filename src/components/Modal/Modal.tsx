import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";

import { X, ArrowLeft } from 'react-native-lucide';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { Color } from '../../constants';

const ModalView = styled(SafeAreaView)<{orientation?: 'top' | 'bottom' | 'center' | 'fullScreen', swipeToClose?: boolean}>`
    height: ${props => props.orientation === 'fullScreen' ? '95%' : 'auto'};
    max-height: ${props => (props.orientation === 'bottom' || props.orientation === 'top') ? '80%' : (props.orientation === 'fullScreen' ? '90%' : '80%')};
    width: 100%;
    overflow: hidden;
    border-top-left-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '24px' : '12px'};
    border-top-right-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '24px' : '12px'};
    border-bottom-left-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '0px' : '12px'};
    border-bottom-right-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '0px' : '12px'};
    padding: 0px 16px;
    background-color: ${Color.background.neutral};
`
const SwipeView = styled.View`
    height: 30px;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`
const Swipe = styled.View`
    height: 5px;
    width: 48px;
    border-radius: 100px;
    background-color: ${Color.gray4};
`
const Header = styled.View`
    height: 56px;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`
const CloseButton = styled.Pressable`
    position: absolute;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
    margin-left: -8px;
    z-index: 1000;
`
const TitleCenterView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const GoBackContainer = styled.View`
`
const TitleDownView = styled.View`
`

const ButtonArea = styled.View`
`

const ModalComponent = (props: Props) =>{

    const { buttonProps, secondButtonProps } = props;
    let swipeToClose = (props.orientation === 'top' || props.orientation === 'bottom');

    const onClosePress = () =>{
        props.onDismiss && props.onDismiss();
    }
    const onModalHide = () =>{
        props.onModalHide && props.onModalHide();
    }

    return(
        <Modal
            isVisible={props.visible}
            swipeDirection={swipeToClose ? "down": undefined}
            style={props.orientation === 'fullScreen' || props.orientation === 'bottom' ? {
                justifyContent: 'flex-end',
                margin: 0
            } : (props.orientation === 'top' ? {
                justifyContent: 'flex-start',
                margin: 0
            } : {})}
            onModalHide={onModalHide}
            onBackdropPress={onClosePress}
            onSwipeComplete={swipeToClose ? onClosePress : undefined}
            avoidKeyboard={props.avoidKeyboard}
        >
            <ModalView
                orientation={props.orientation}
                swipeToClose={swipeToClose}
                style={props.style}
            >
                {swipeToClose &&
                    <SwipeView>
                        <Swipe/>
                    </SwipeView>
                }
                {props.showTopClose &&
                    props.canGoBack ?
                        <GoBackContainer>
                            <Header>
                                <CloseButton
                                    onPress={onClosePress}
                                    style={{marginTop: props.orientation === 'fullScreen' ? 8 : 0}}
                                >
                                    <ArrowLeft color={Color.black}/>
                                </CloseButton>
                            </Header>
                            {props.title &&
                                <TitleDownView>
                                    <Text
                                        type='h4'
                                        weight='semibold'
                                        style={{color: Color.gray1}}
                                    >
                                        {props.title}
                                    </Text>
                                    {props.subtitle &&
                                        <Text
                                            type='p2'
                                            style={{color: Color.gray4}}
                                        >
                                            {props.subtitle}
                                        </Text>
                                    }
                                </TitleDownView>
                            }
                        </GoBackContainer>
                        : props.title &&
                            <Header>
                                {!props.showBottomClose &&
                                    <CloseButton
                                        onPress={onClosePress}
                                        style={{marginTop: props.orientation === 'fullScreen' ? 8 : 0}}
                                    >
                                        <X color={Color.black}/>
                                    </CloseButton>
                                }
                                <TitleCenterView>
                                    <Text
                                        type='p1'
                                        weight='medium'
                                        style={{color: Color.gray1}}
                                    >
                                        {props.title}
                                    </Text>
                                </TitleCenterView>
                            </Header>
                }
                {props.children}
                <ButtonArea>
                    {buttonProps &&
                        <Button
                            {...buttonProps}
                            style={{marginTop: 12, ...buttonProps.style}}
                        />
                    }
                    {secondButtonProps &&
                        <Button
                            {...secondButtonProps}
                            style={{marginTop: 12, ...secondButtonProps.style}}
                        />
                    }
                    {props.showBottomClose &&
                        <Button
                            type={'line'}
                            style={{borderWidth: 0, marginTop: 8}}
                            color={Color.gray3}
                            title={props.translation ? props.translation.general_btn_cancel : 'Cancelar'}
                            onPress={onClosePress}
                        />
                    }
                    {props.ButtonArea}
                </ButtonArea>
            </ModalView>
        </Modal>
    )
};
export default ModalComponent;
export interface Props{
    translation?: {
		[key: string]: any
	},
    style?: ViewStyle,
    ref?: any,
    title?: string,
    subtitle?: string,
    orientation?: 'top' | 'bottom' | 'center' | 'fullScreen',
    showTopClose?: boolean,
    canGoBack?: boolean,
    showBottomClose?: boolean,
    buttonProps?: {
        onPress?: any,
        title: string,
        style?: ViewStyle,
        [key: string]: any
    },
    secondButtonProps?: {
        onPress?: any,
        title: string,
        style?: ViewStyle,
        [key: string]: any
    }
    ButtonArea?: any,
    visible: boolean,
    onDismiss: Function,
    onModalHide?: Function,
    avoidKeyboard?: boolean,
    children?: any
}