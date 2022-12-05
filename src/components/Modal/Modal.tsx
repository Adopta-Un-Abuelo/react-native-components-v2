import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import { X, ArrowLeft } from 'lucide-react-native';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { Color } from '../../constants';

const ModalView = styled(SafeAreaView)<{orientation?: 'top' | 'bottom' | 'center' | 'fullScreen', swipeToClose?: boolean, noPadding?: boolean}>`
    height: ${props => props.orientation === 'fullScreen' ? '95%' : 'auto'};
    max-height: ${props => (props.orientation === 'bottom' || props.orientation === 'top') ? '80%' : (props.orientation === 'fullScreen' ? '90%' : '80%')};
    width: 100%;
    overflow: hidden;
    border-top-left-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '24px' : '12px'};
    border-top-right-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '24px' : '12px'};
    border-bottom-left-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '0px' : '12px'};
    border-bottom-right-radius: ${props => (props.orientation === 'bottom' || props.orientation === 'fullScreen') ? '0px' : '12px'};
    padding: ${props => props.noPadding ? '0px' : '8px 16px'};
    background-color: ${Color.background.neutral};
`
const SwipeView = styled.View`
    height: 29px;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`
const Swipe = styled.View`
    height: 5px;
    width: 48px;
    border-radius: 100px;
    background-color: ${Color.background.mediumLow};
`
const Header = styled.View`
    height: 56px;
    flex-direction: row;
    align-items: center;
`
const CloseButton = styled.Pressable`
    position: absolute;
    height: 56px;
    width: 56px;
    justify-content: center;
    z-index: 1000;
    padding-left: 8px;
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
    padding-bottom: 24px;
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
            swipeDirection={swipeToClose ? 'down' : undefined}
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
                noPadding={props.noPadding}
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
                                    <ArrowLeft color={Color.text.full}/>
                                </CloseButton>
                            </Header>
                            {props.title &&
                                <TitleDownView>
                                    <Text
                                        type='h4'
                                        weight='semibold'
                                    >
                                        {props.title}
                                    </Text>
                                    {props.subtitle &&
                                        <Text
                                            type='p2'
                                            style={{color: Color.text.high}}
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
                                        style={{marginTop: props.orientation === 'fullScreen' ? 8 : 0, marginLeft: props.noPadding ? 0 : -8}}
                                    >
                                        <X color={Color.text.full}/>
                                    </CloseButton>
                                }
                                <TitleCenterView>
                                    <Text
                                        type='p1'
                                        weight='medium'
                                    >
                                        {props.title}
                                    </Text>
                                </TitleCenterView>
                            </Header>
                }
                {props.children}
                {(buttonProps || secondButtonProps || props.showBottomClose || props.ButtonArea) &&
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
                                style={{marginTop: 8, ...secondButtonProps.style}}
                            />
                        }
                        {props.showBottomClose &&
                            <Button
                                type={'line'}
                                style={{borderWidth: 0, marginTop: 8}}
                                textColor={Color.text.high}
                                title={props.cancelString ? props.cancelString : 'Cancelar'}
                                onPress={onClosePress}
                            />
                        }
                        {props.ButtonArea}
                    </ButtonArea>
                }
            </ModalView>
        </Modal>
    )
};
export default ModalComponent;
export interface Props{
    style?: ViewStyle,
    ref?: any,
    title?: string,
    subtitle?: string,
    orientation?: 'top' | 'bottom' | 'center' | 'fullScreen',
    showTopClose?: boolean,
    showBottomClose?: boolean,
    canGoBack?: boolean,
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
    children?: any,
    noPadding?: boolean,
    cancelString?: string
}