import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { ArrowLeft } from "react-native-lucide";
import ButtonImage from '../Button/ButtonImage';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Text from '../Text/TextAnimated';
import { Color } from '../../constants';

const MainView = styled(Animated.View)`
    width: 100%;
    justify-content: flex-end;
    padding-top: 18px;
    background-color: ${Color.background.neutral};
    border-bottom-width: 1px;
`
const RightHeader = styled.View`
    position: absolute;
    right: 16px;
    top: 8px;
    align-items: center;
`
const TextContainer = styled(Animated.View)`
    padding-right: 16px;
`

const NavigationBar: FC<Props> = props => {

    const showBackButton = (!props.hideBackButton && props.navigation && props.navigation.canGoBack()) ? true : false

    const MIN_HEADER_HEIGHT = 56;
    const MAX_HEADER_HEIGHT = (props.title && props.subtitle) ? 120 : ((!props.subtitle && !props.title) ? 56 : 100);

    const headerHeight = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
        extrapolate: 'clamp'
    }) : MAX_HEADER_HEIGHT;

    const MIN_TITLE_LEFT = 16;
    const MAX_TITLE_LEFT = showBackButton ? 48 : 16;

    const titleLeft = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MIN_TITLE_LEFT, MAX_TITLE_LEFT],
        extrapolate: 'clamp'
    }) : MIN_TITLE_LEFT;

    const MIN_TITLE_BOTTOM = 8;
    const MAX_TITLE_BOTTOM = (props.title && props.subtitle) ? 8 : 8;

    const titleBottom = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MIN_TITLE_BOTTOM, MAX_TITLE_BOTTOM],
        extrapolate: 'clamp'
    }) : MIN_TITLE_BOTTOM;

    const MIN_TITLE_FONT = 18;
    const MAX_TITLE_FONT = 28;

    const titleFont = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_TITLE_FONT, MIN_TITLE_FONT],
        extrapolate: 'clamp'
    }) : MAX_TITLE_FONT;

    const MIN_SUBTITLE_FONT = 14;
    const MAX_SUBTITLE_FONT = 20;

    const subtitleFont = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_SUBTITLE_FONT, MIN_SUBTITLE_FONT],
        extrapolate: 'clamp'
    }) : MAX_SUBTITLE_FONT;

    const MIN_BREADCRUMB_OPACITY = 0;
    const MAX_BREADCRUMB_OPACITY = 1;

    const breadcrumbOpacity = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_BREADCRUMB_OPACITY, MIN_BREADCRUMB_OPACITY],
        extrapolate: 'clamp'
    }) : MAX_BREADCRUMB_OPACITY;

    const MIN_BORDER_OPACITY = 'rgba(224, 224, 224, 0)';
    const MAX_BORDER_OPACITY = 'rgba(224, 224, 224, 1)';

    const borderColor = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MIN_BORDER_OPACITY, MAX_BORDER_OPACITY],
        extrapolate: 'clamp'
    }) : MIN_BORDER_OPACITY;

    return(
        <MainView
            style={{height: headerHeight, borderBottomColor: borderColor}}
        >
            {showBackButton &&
                <ButtonImage
                    style={{
                        position: 'absolute',
                        top: 8,
                        left: 6,
                        height: 40,
                        width: 40,
                        zIndex: 1000,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: 0,
                        ...props.backButtonStyle
                    }}
                    icon={ArrowLeft}
                    onPress={()=>props.navigation?.goBack()}
                />
            }
            <TextContainer
                style={{
                    left: titleLeft,
                    right: titleLeft,
                    bottom: titleBottom
                }}
            >
                {props.title &&
                    <Text
                        type='h2'
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        lineBreakMode={'tail'}
                        style={{
                            fontSize: titleFont,
                            marginRight: 32
                        }}
                    >
                        {props.title}
                    </Text>
                }
            </TextContainer>
            {(props.breadcrumbProps && !props.hideBreadcrumb) &&
                <Breadcrumb
                    steps={props.breadcrumbProps.steps}
                    currentStep={props.breadcrumbProps.currentStep}
                    style={{
                        position: 'absolute', 
                        top: 24, 
                        opacity: breadcrumbOpacity
                    }}
                />
            }
            {props.headerRight &&
                <RightHeader>
                    {props.headerRight}
                </RightHeader>
            }
        </MainView>
    )
}
export default NavigationBar;
export interface Props{
    previous?: Object,
    scene?: {
        [key: string]: any
    },
    navigation?: {
        canGoBack: Function,
        goBack: Function,
        [key: string]: any
    },
    breadcrumbProps?:{
        steps: number,
        currentStep: number
    },
    backButtonStyle?: any
    hideBackButton?: boolean,
    hideBreadcrumb?: boolean,
    hideHeader?: boolean,
    title?: string,
    subtitle?: string,
    headerRight?: any,
    animatedValue?: Animated.Value
}