import React, { FC, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../../constants/Color';
import Checkbox from '../Checkbox/Checkbox';

const Container = styled.View`
    top: 32px;
`
const SelectGeneration: FC<Props> = props =>{

    const onCellPress = (item: {id: string, title: string}) =>{
        props.onPress && props.onPress(item);
    }

    return(
        <Container>
            <Checkbox
                style={{flexDirection: 'column'}}
                cellStyle={{paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: Color.gray4}}
                options={props.options}
                onChange={onCellPress}
            />
        </Container>
    )
}
export default SelectGeneration;
export interface Props{
    onPress?: Function,
    color?: string,
    options: Array<{
        id: string,
        title: string,
        subtitle: string
    }>
    defaultSelection?: string
}