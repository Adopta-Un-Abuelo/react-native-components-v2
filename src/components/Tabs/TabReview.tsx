import React, { FC, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import ReviewSmall from '../Review/ReviewSmall';

const ItemView = styled.Pressable`
    max-width: 340px;
    padding: 16px;
    background-color: ${Color.background.neutral};
    border-radius: 12px;
    margin-right: 16px;
`
const ColumnView = styled.Pressable`
`
const RowView = styled.View`
    flex-direction: row;
`

const TabScrollable: FC<Props> = props =>{

    const [ options, setOptions ] = useState<Array<{name: string, date: string, review: string, image: any}>>();

    useEffect(() =>{
        if(props.options && props.options.length > 0) {
            setOptions(props.options);
        }
    }, [props.options]);

    const renderCell = ({item, index}) => {
        return(
            <ItemView>
                <RowView>
                    <ColumnView
                        style={{flex: 1, marginRight: 12}}
                    >
                        <Text
                            type='p1'
                            weight='medium'
                        >
                            {item.name}
                        </Text>
                        <Text
                            type='p2'
                            style={{color: Color.text.high}}
                        >
                            {item.date}
                        </Text>
                    </ColumnView>
                    {item.image}
                </RowView>
                <ReviewSmall 
                    style={{marginTop: 14}}
                />
                <Text
                    type='p2'
                    style={{marginTop: 8}}
                >
                    {item.review}
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
        />
    )
}

export default TabScrollable;
export interface Props{
    style?: Object,
    options: Array<{
        name: string,
        date: string,
        image: any,
        review: string
    }>
}