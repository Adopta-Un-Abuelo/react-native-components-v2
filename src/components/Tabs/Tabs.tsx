import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import Color from '../../constants/Color';

import Text from '../Text/Text';

const Container = styled.View<{theme: 'line' | 'circular'}>`
    flex-direction: row;
    height: ${props => props.theme === 'circular' ? '36px' : '48px'};
    background-color: ${props => props.theme === 'circular' ? Color.gray6 : 'transparent'};
    border-radius: 8px;
`
const List = styled.FlatList`
`
const Tab = styled.Pressable<{selected: boolean, color?: string}>`
    align-items: center;
    justify-content: center;
    border-bottom-width: ${props => props.selected ? '4px' : '0px'}; 
    border-bottom-color: ${props => props.color ? props.color: Color.blue5};
    margin: 0px 8px;
`
const TabCircular = styled.Pressable<{selected: boolean, color?: string}>`
    align-items: center;
    justify-content: center;
    padding: 0px 18px;
    border-radius: 8px;
    background-color: ${props => props.selected ? Color.blue3 : 'transparent'};
`

const Tabs: FC<Props> = props =>{

    const [ selection, setSelection ] = useState<{id: string}>(props.defaultSelection ? props.defaultSelection : props.options[0]);

    const onTabPress = option =>{
        setSelection(option);
        props.onChange && props.onChange(option);
    }

    return(
        <Container
            style={props.style}
            theme={props.theme ? props.theme : 'line'}
        >
            <List
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={props.options}
                renderItem={({item, index}) => {
                    const temp: any = item;
                    const selected = selection && temp.id === selection.id;
                    if(!props.theme || props.theme === 'line'){
                        return(
                            <Tab
                                style={props.tabStyle}
                                theme={props.theme}
                                key={'tab'+index}
                                selected={selected}
                                color={props.color}
                                onPress={() => onTabPress(temp)}
                            >
                                <Text
                                    weight={'semibold'}
                                    numberOfLines={1}
                                    ellipsizeMode={'tail'}
                                >
                                    {temp.title}
                                </Text>
                            </Tab>
                        )
                    }
                    else if(props.theme === 'circular'){
                        return(
                            <TabCircular
                                style={props.tabStyle}
                                theme={props.theme}
                                key={'tab'+index}
                                selected={selected}
                                color={props.color}
                                onPress={() => onTabPress(temp)}
                            >
                                <Text
                                    style={{color: selected ? 'white' : Color.gray3}}
                                    weight={'semibold'}
                                    numberOfLines={1}
                                    ellipsizeMode={'tail'}
                                >
                                    {temp.title}
                                </Text>
                            </TabCircular>
                        )
                    }
                    else return null;
                }}
            />
        </Container>
    )
}
export default Tabs;
export interface Props{
    style?: Object,
    theme?: 'line' | 'circular'
    tabStyle?: Object,
    options: Array<{
        id: string,
        title: string
    }>
    defaultSelection?: {
        id: string,
        title?: string
    }
    onChange?: Function
    color?: string
}