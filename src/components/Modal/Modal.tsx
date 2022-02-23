import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";

import { X } from 'react-native-feather';
import Text from '../Text/Text';
import Button from '../Button/Button';
import ButtonImage from '../Button/ButtonImage';
import { Color } from '../../constants';

const ModalView = styled(SafeAreaView)<{horientation?: 'top' | 'bottom' | 'center' | 'fullScreen', swipeToClose?: boolean}>`
    background-color: white;
    border-radius: 8px;
    border-top-left-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '24px' : '8px'};
    border-top-right-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '24px' : '8px'};
    border-bottom-left-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '0px' : '8px'};
    border-bottom-right-radius: ${props => (props.horientation === 'bottom' || props.horientation === 'fullScreen') ? '0px' : '8px'};
    padding: 16px 16px 46px 16px;
    padding-bottom: ${props => props.horientation === 'bottom' ? '0px' : '12px'};
    padding-top: ${props => props.swipeToClose ? '0px' : (props.horientation === 'top' ? '48px' : '24px')};
    width: 100%;
    max-height: ${props => (props.horientation === 'bottom' || props.horientation === 'top') ? '80%' : (props.horientation === 'fullScreen' ? '95%' : '80%')};
    height: ${props => props.horientation === 'fullScreen' ? '95%' : 'auto'};
    overflow: hidden;
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
const CloseButton = styled.Pressable`
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
`
const Header = styled.View`
    height: 56px;
    flex-direction: row;
    align-items: center;
`
const TitleView = styled.View`
    left: 8px;
    align-items: center;
    justify-content: center;
    background-color: black;
`
const SafeArea = styled.View`
    padding-bottom: 40px;
`

const ModalComponent = (props: Props) =>{

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
            avoidKeyboard={props.avoidKeyboard}
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
                {(props.title 
                // || props.subtitle
                ) &&
                    <Header>
                        {(props.horientation === 'fullScreen' && !props.hideClose) &&
                            <CloseButton
                                onPress={onClosePress}
                            >
                                <X stroke={Color.black}/>
                            </CloseButton>
                        }
                        <TitleView>
                            {props.title &&
                                <Text
                                    type='p1'
                                    weight='medium'
                                    style={{color: Color.gray1}}
                                >
                                    {props.title}
                                </Text>
                            }
                            {/* {props.subtitle &&
                                <Text
                                    type='p2'
                                    style={{color: Color.gray2, marginTop: 6}}
                                    >
                                    {props.subtitle}
                                </Text>
                            } */}
                        </TitleView>
                    </Header>
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
                            type={'line'}
                            style={{borderWidth: 0}}
                            color={Color.gray3}
                            title={props.translation ? props.translation.general_btn_cancel : 'Cancelar'}
                            onPress={onClosePress}
                        />
                    }
                </SafeArea>
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
    // subtitle?: string,
    hideClose?: boolean,
    horientation?: 'top' | 'bottom' | 'center' | 'fullScreen',
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
    swipeToClose?: boolean,
    avoidKeyboard?: boolean,
    children?: any ,
    onBackPress?: Function
}