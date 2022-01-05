import React, { FC } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";

import { X } from 'react-native-feather';
import Title from '../Text/Title';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { Color } from '../../constants';

const ModalView = styled(SafeAreaView)<{horientation?: 'top' | 'bottom' | 'center' | 'fullScreen', swipeToClose?: boolean}>`
    background-color: white;
    border-radius: 8px;
    border-top-left-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '32px' : '8px'};
    border-top-right-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '32px' : '8px'};
    border-bottom-left-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '0px' : '8px'};
    border-bottom-right-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '0px' : '8px'};
    padding: 24px;
    padding-bottom: ${props => props.horientation === 'bottom' ? '0px' : '12px'};
    padding-top: ${props => props.swipeToClose ? '0px' : (props.horientation === 'top' ? '48px' : '24px')};
    width: 100%;
    max-height: ${props => (props.horientation === 'bottom' || props.horientation === 'top') ? '65%' : (props.horientation === 'fullScreen' ? '95%' : '80%')};
    height: ${props => props.horientation === 'fullScreen' ? '95%' : 'auto'};
    overflow: hidden;
`
const CloseButton = styled.Pressable`
    position: absolute;
    top: 12px;
    right: 12px;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
`
const TitleView = styled.View`
    border-bottom-color: ${Color.gray5};
    border-bottom-width: 1px;
    padding-bottom: 14px;
`
const SafeArea = styled.View`
    background-color: white;
`
const SwipeView = styled.View`
    align-items: center;
    justify-content: center;
    z-index: 1000;
    height: 22px;
    margin-bottom: -22px;
`
const Swipe = styled.View`
    height: 6px;
    width: 60px;
    border-radius: 22px;
    background-color: ${Color.gray5};
`

const ModalComponent: FC<Props> = props =>{

    const { buttonProps, secondButtonProps } = props;
    const onClosePress = () =>{
        props.onDismiss && props.onDismiss();
    }
    const onModalHide = () =>{
        props.onModalHide && props.onModalHide();
    }

    return(
        <Modal
            isVisible={props.visible}
            onBackdropPress={onClosePress}
            onSwipeComplete={props.swipeToClose ? onClosePress : undefined}
            swipeDirection={props.swipeToClose ? "down": undefined}
            style={props.horientation === 'fullScreen' || props.horientation === 'bottom' ? {
                justifyContent: 'flex-end',
                margin: 0
            } : (props.horientation === 'top' ? {
                justifyContent: 'flex-start',
                margin: 0
            } : {})}
            onModalHide={onModalHide}
        >
            <ModalView
                horientation={props.horientation}
                swipeToClose={props.swipeToClose}
                style={props.style}
            >
                {props.swipeToClose &&
                    <SwipeView>
                        <Swipe/>
                    </SwipeView>
                }
                {(props.title || props.subtitle) &&
                    <TitleView
                        style={{marginTop: props.swipeToClose ? 28 : 0}}
                    >
                        {props.title &&
                            <Title
                                style={{fontSize: 24}}
                            >
                                {props.title}
                            </Title>
                        }
                        {props.subtitle &&
                            <Text>{props.subtitle}</Text>
                        }
                    </TitleView>
                }
                {props.children}
                <SafeArea>
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
                    {((!props.hideClose && props.horientation !== 'fullScreen') || props.showBottomClose) &&
                        <Button
                            style={{backgroundColor: 'transparent'}}
                            color={Color.gray3}
                            title={props.translation ? props.translation.modal_cancel : 'Cancelar'}
                            onPress={onClosePress}
                        />
                    }
                </SafeArea>
                {(props.horientation === 'fullScreen' && !props.hideClose) &&
                    <CloseButton
                        onPress={onClosePress}
                    >
                        <X stroke={Color.gray2}/>
                    </CloseButton>
                }
            </ModalView>
        </Modal>
    )
};
export default ModalComponent;
export interface Props{
    translation?: {
		[key: string]: any
	},
    style?: Object,
    ref?: any,
    title?: string,
    subtitle?: string,
    hideClose?: boolean,
    horientation?: 'top' | 'bottom' | 'center' | 'fullScreen',
    showBottomClose?: boolean,
    buttonProps?: {
        onPress?: any,
        title: string,
        style?: Object,
        [key: string]: any
    },
    secondButtonProps?: {
        onPress?: any,
        title: string,
        style?: Object,
        [key: string]: any
    }
    visible: boolean,
    onDismiss: Function,
    onModalHide?: Function,
    swipeToClose?: boolean
}