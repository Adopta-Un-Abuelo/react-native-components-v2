import React, { FC } from 'react';
import styled from 'styled-components/native';
import { PressableProps, ViewStyle } from 'react-native';
import Button from './Button';
import Color from '../../constants/Color';

const Container = styled.View<{showShadow?: boolean}>`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 24px;
    border-top-width: ${props => props.showShadow ? '1px' : '0px'};
    border-top-color: ${Color.background.low};
`

const BottomButton: FC<Props> = props =>{

    const { leftView, showShadow, style, ...rest } = props;

    return(
        <Container
            showShadow={showShadow}
        >
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
    style?: ViewStyle,
    showShadow?: boolean,
    gradient?: {
        colorStart: string,
        colorEnd: string
    }
}