import React, { FC } from 'react';
import styled from 'styled-components/native';
import { PressableProps, ViewStyle } from 'react-native';
import Button from './Button';

const Container = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 12px 16px;
`

const BottomButton: FC<Props> = props =>{
    const { leftView, style, ...rest } = props;
    return(
        <Container>
            {leftView &&
                <props.leftView/>
            }
            <Button
                style={{flex: props.size === 'big' ? 1 : 0, ...style}}
                {...rest}
            />
        </Container>
    )
}
export default BottomButton;
export interface Props extends PressableProps{
    size?: 'big' | 'small',
    title: string,
    leftView?: any,
    style?: ViewStyle
}