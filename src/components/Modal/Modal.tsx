import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";

import { X } from 'react-native-feather';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { Color } from '../../constants';

const ModalView = styled(SafeAreaView)<{orientation?: 'top' | 'bottom' | 'center' | 'fullScreen', swipeToClose?: boolean}>`
    height: ${props => props.orientation === 'fullScreen' ? '95%' : 'auto'};
    max-height: ${props => (props.orientation === 'bottom' || props.orientation === 'top') ? '80%' : (props.orientation === 'fullScreen' ? '90%' : '80%')};
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    border-top-left-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '24px' : '8px'};
    border-top-right-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '24px' : '8px'};
    border-bottom-left-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '0px' : '8px'};
    border-bottom-right-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '0px' : '8px'};
    padding: 0px 16px 46px 16px;
    background-color: white;
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
`
const CloseButton = styled.Pressable`
    height: 40px;
    width: 40px;
    justify-content: center;
`
const TitleCenterView = styled.View`
    left: 8px;
    align-items: center;
    justify-content: center;
`
const TitleView = styled.View`
    top: 8px;
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
                    <Header>
                        <CloseButton
                            onPress={onClosePress}
                            style={{marginTop: props.orientation === 'fullScreen' ? 8 : 0}}
                        >
                            <X stroke={Color.black}/>
                        </CloseButton>
                        {(props.title && props.orientation === 'top' || props.orientation === 'bottom') && 
                            <TitleCenterView>
                                <Text
                                    type='p1'
                                    weight='medium'
                                    style={{color: Color.gray1}}
                                >
                                    {props.title}
                                </Text>
                            </TitleCenterView>
                        }
                    </Header>
                }
                {(props.title && props.orientation === 'fullScreen') && 
                    <TitleView>
                        <Text
                            type='p1'
                            weight='medium'
                            style={{color: Color.gray1}}
                        >
                            {props.title}
                        </Text>
                        {props.subtitle &&
                            <Text
                                type='p2'
                                style={{color: Color.gray2, marginTop: 6}}
                            >
                                {props.subtitle}
                            </Text>
                        }
                    </TitleView>
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
                            style={{borderWidth: 0}}
                            color={Color.gray3}
                            title={props.translation ? props.translation.general_btn_cancel : 'Cancelar'}
                            onPress={onClosePress}
                        />
                    }
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
    visible: boolean,
    onDismiss: Function,
    onModalHide?: Function,
    avoidKeyboard?: boolean,
    children?: any
}