import React, { FC, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonBottom from '../Button/ButtonBottom';
import NavigationBar from '../Navigation/NavigationBar';
import List from '../List/List';

const SafeView = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`

const ListContainer: FC<Props> = props =>{
    const offset = useRef(new Animated.Value(0)).current;
    return(
        <SafeView
            style={props.style}
            edges={props.edges ? props.edges : (props.buttonProps ?  ["left", "right", "top", "bottom"] : ["left", "right", "top"])}
        >
            {props.navbarProps &&
                <NavigationBar
                    animatedValue={offset}
                    {...props.navbarProps}
                />
            }
            <List
                scrollEventThrottle={1}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                contentContainerStyle={{paddingLeft: 24, paddingRight: 24, paddingBottom: 48}}
                stickyHeaderIndices={props.listProps.stickyHeaderIndices}
                {...props.listProps}
                ListHeaderComponent={props.listProps.HeaderComponent}
                ListEmptyComponent={props.listProps.ListEmptyComponent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                )}
            />
            {props.children}
            {props.buttonProps &&
                <ButtonBottom
                    {...props.buttonProps}
                />
            }
        </SafeView>
    )
}
export default ListContainer;
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
        noHeader?: boolean
    }
    listProps?: any,
    buttonProps?: any,
    style?: any,
    edges?: Array<"top" | "right" | "left" | "bottom">
}