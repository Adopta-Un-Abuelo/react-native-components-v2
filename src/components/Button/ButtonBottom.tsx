import React, { FC } from 'react';
import styled from 'styled-components/native';
import { PressableProps, ViewStyle } from 'react-native';

import Button from './Button';
import Color from '../../constants/Color';

const Container = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 12px 16px 40px;
    background-color: white;
`

const BottomButton: FC<Props> = props =>{

    const { showShadow, leftView, size, ...rest } = props;

    return(
        <Container
            style={showShadow &&{
                shadowColor: Color.gray5,
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 2,
                borderTopWidth: 1,
                borderTopColor: Color.gray5
            }}
        >
            {leftView &&
                <props.leftView/>
            }
            <Button
                style={{flex: props.size === 'big' ? 1 : 0}}
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
    showShadow?: boolean,
    style?: ViewStyle
}