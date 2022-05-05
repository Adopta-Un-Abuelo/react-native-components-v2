import React, { forwardRef, Ref } from 'react';
import { FlatListProps, FlatList } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const ListStyled = styled.FlatList<any>`
`
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const List = forwardRef((props: Props, ref: Ref<FlatList>) =>{

    const { loading, ...rest } = props;

    if(loading)
        return(
            <Container>
                <LottieView 
                    style={{height: 68}}
                    source={require('../../assets/animations/main-loading.json')} 
                    autoPlay
                    loop
                />
            </Container>
        )
    return(
        <ListStyled
            {...rest}
            ref={ref}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
        />
    )
});
export default List;
export interface Props extends FlatListProps<any>{
    loading?: boolean
}