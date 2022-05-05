import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { ArrowLeft } from "react-native-lucide";
import ButtonImage from '../Button/ButtonImage';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Text from '../Text/TextAnimated';
import { Color } from '../../constants';

const MainView = styled(Animated.View)<{backgroundColor?: string}>`
    width: 100%;
    flex-direction: row;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : Color.background.neutral};
    border-bottom-width: 1px;
`
const RightHeader = styled.View`
    position: absolute;
    right: 0;
    top: 0;
    height: 56px;
    width: 56px;
    align-items: center;
    justify-content: center;
`
const TextContainer = styled(Animated.View)`
    flex: 1;
    justify-content: flex-end;
    margin-right: 16px;
`

const NavigationBar: FC<Props> = props => {

    const showBackButton = (!props.hideBackButton && props.navigation && props.navigation.canGoBack()) ? true : false;

    const MIN_HEADER_HEIGHT = 56;
    const MAX_HEADER_HEIGHT = (props.title && props.subtitle) ? 120 : ((!props.subtitle && !props.title) ? 56 : 100);

    const headerHeight = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
        extrapolate: 'clamp'
    }) : MAX_HEADER_HEIGHT;

    // Title margin left
    const MIN_TITLE_LEFT = 16;
    const MAX_TITLE_LEFT = showBackButton ? 56 : 16;

    const titleSides = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MIN_TITLE_LEFT, MAX_TITLE_LEFT],
        extrapolate: 'clamp'
    }) : MIN_TITLE_LEFT;

    // Title margin bottom
    const MIN_TITLE_BOTTOM = 0;
    const MAX_TITLE_BOTTOM = (props.title && props.subtitle) ? 8 : 8;

    const titleBottom = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MIN_TITLE_BOTTOM, MAX_TITLE_BOTTOM],
        extrapolate: 'clamp'
    }) : MIN_TITLE_BOTTOM;

    // Title Font
    const MIN_TITLE_FONT = 18;
    const MAX_TITLE_FONT = 32;

    const titleFont = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_TITLE_FONT, MIN_TITLE_FONT],
        extrapolate: 'clamp'
    }) : MAX_TITLE_FONT;

    // Bread crumb
    const MIN_BREADCRUMB_OPACITY = 0;
    const MAX_BREADCRUMB_OPACITY = 1;

    const breadcrumbOpacity = props.animatedValue ? props.animatedValue.interpolate({
        inputRange: [0, MAX_HEADER_HEIGHT],
        outputRange: [MAX_BREADCRUMB_OPACITY, MIN_BREADCRUMB_OPACITY],
        extrapolate: 'clamp'
    }) : MAX_BREADCRUMB_OPACITY;

    // Border color
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
            backgroundColor={props.backgroundColor}
        >
            {showBackButton &&
                <ButtonImage
                    style={{
                        position: 'absolute',
                        height: 56,
                        width: 56,
                        zIndex: 1000,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...props.backButtonStyle
                    }}
                    icon={ArrowLeft}
                    onPress={()=>props.navigation?.goBack()}
                />
            }
            <TextContainer
                style={{
                    left: titleSides,
                    right: titleSides,
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
                            marginRight: 16
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
    animatedValue?: Animated.Value,
    backgroundColor?: string
}