import React, { useRef, forwardRef, Ref } from 'react';
import { Animated, FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonBottom from '../Button/ButtonBottom';
import NavigationBar from '../Navigation/NavigationBar';
import List from '../List/List';
import { Color } from '../../constants';

const SafeView = styled(SafeAreaView)`
    flex: 1;
    background-color: ${Color.background.neutral};
`

const ListContainer = forwardRef((props: Props, ref: Ref<FlatList>) =>{
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
                ref={ref}
                scrollEventThrottle={1}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                contentContainerStyle={{paddingLeft: props.noPadding ? 0 : 16, paddingRight: props.noPadding ? 0 : 16, paddingBottom: 48}}
                stickyHeaderIndices={props.listProps.stickyHeaderIndices}
                {...props.listProps}
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
});
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
        noHeader?: boolean,
        backgroundColor?: string
    }
    listProps?: FlatListProps<any>,
    buttonProps?: any,
    style?: any,
    edges?: Array<"top" | "right" | "left" | "bottom">,
    noPadding?: boolean,
    children?: React.ReactNode
}