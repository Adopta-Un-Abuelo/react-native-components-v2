import React, { FC, useState, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const ItemView = styled.Pressable<{enabled: boolean, full: boolean}>`
    align-items: center;
    padding-bottom: 8px;
    padding-top: 8px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${props => props.enabled ? (props.full ? Color.background.deepBlue : Color.background.neutral) : Color.background.soft};
    border-radius: 100px;
`

const TabScrollable: FC<Props> = props =>{

    const [ currentIndex, setCurrentIndex ] = useState<number>();
    const [ options, setOptions ] = useState<Array<{date: Date, title: string, enabled: boolean}>>();

    useEffect(() =>{
        if(props.options && props.options.length > 0) {
            setOptions(props.options);
            if(Platform.OS === 'ios') {
                setCurrentIndex(props.options.length-1);
            }
        }
    }, [props.options]);

    const getItemLayout = (data, index) => {
        return { length: 150, offset: 150 * index, index }
    }

    const onTabPress = (item, index) => {
        const newOptions = options.map((e) => {
            if(item.title === e.title) {
                return {
                    ...e,
                    enabled: true
                }
            } else {
                return {
                    ...e,
                    enabled: false
                }
            }
        });
        setOptions(newOptions);
        setCurrentIndex(index);
        props.onTabPress && props.onTabPress(item, index);
    }

    const renderCell = ({item, index}) => {
        return(
            <ItemView
                enabled={item.enabled}
                full={item.date === undefined}
                onPress={() => onTabPress(item, index)}
                style={props.tabStyle}
            >
                <Text
                    type='p2'
                    weight='medium'
                    style={{color: item.enabled ? (item.date === undefined ? Color.text.white : Color.text.full) : Color.text.high}}
                >
                    {item.title}
                </Text>
            </ItemView>
        )
    }

    return(
        <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={options}
            renderItem={renderCell}
            style={props.style}
            initialScrollIndex={currentIndex}
            getItemLayout={getItemLayout}
        />
    )
}

export default TabScrollable;
export interface Props{
    style?: Object,
    tabStyle?: Object,
    options: Array<{
        date: Date,
        title: string,
        enabled: boolean
    }>,
    onTabPress: Function
}