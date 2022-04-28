import React, { FC, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const { width } = Dimensions.get('window');

const Container = styled.View`
    height: 36px;
    background-color: ${Color.background.soft};
    border-radius: 100px;
`
const List = styled.FlatList`
`
const TabCircular = styled.Pressable<{selected: boolean}>`
    width: ${(width/2)-20}px;
    align-items: center;
    justify-content: center;
    margin: 2px;
    border-radius: 100px;
    background-color: ${props => props.selected ? Color.background.neutral : Color.background.soft};
`

const Tabs: FC<Props> = props =>{

    const [ selection, setSelection ] = useState<{id: string}>(props.defaultSelection ? props.defaultSelection : props.options[0]);

    const onTabPress = option =>{
        setSelection(option);
        props.onChange && props.onChange(option);
    }

    const renderItem = ({item, index}) =>{
        const temp: any = item;
        const selected = selection && temp.id === selection.id;
        return(
            <TabCircular
                style={props.tabStyle}
                key={'tab'+index}
                selected={selected}
                onPress={() => onTabPress(temp)}
            >
                <Text
                    style={{color: selected ? Color.text.full : Color.text.high}}
                    type='p2'
                    weight='medium'
                >
                    {temp.title}
                </Text>
            </TabCircular>
        )
    }

    return(
        <Container
            style={props.style}
        >
            <List
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={props.options}
                renderItem={renderItem}
            />
        </Container>
    )
}
export default Tabs;
export interface Props{
    style?: Object,
    tabStyle?: Object,
    options: Array<{
        id: string,
        title: string
    }>,
    defaultSelection?: {
        id: string,
        title?: string
    },
    onChange?: Function
}