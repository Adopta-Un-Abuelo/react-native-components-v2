import React, { FC, forwardRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window');
const CarouselView = styled.View`
    width: ${width}px;
`

const Carousel: FC<Props> = forwardRef<SwiperFlatList>((props, ref) =>{

    return(
        <SwiperFlatList
            {...props}
            ref={ref}
            renderItem={({ item }) => (
                <CarouselView>
                    <item.View {...item}/>
                </CarouselView>
            )}
        />
    )
});
export default Carousel;
export interface Props{
    ref?: any
    data: Array<Object>
    index?: number,
    style?: any,
    autoplay?: boolean,
    autoplayDelay?: number,
    autoplayLoop?: boolean,
    showPagination?: boolean
    paginationActiveColor?: string
    paginationDefaultColor?: string,
    paginationStyle?: StyleMedia,
    paginationStyleItemActive?: StyleMedia,
    paginationStyleItemInactive?: StyleMedia,
    onChangeIndex?: Function
}