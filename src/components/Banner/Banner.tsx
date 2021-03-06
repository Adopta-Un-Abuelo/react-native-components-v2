import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import Button from '../Button/Button';

const Container = styled.View`
    padding: 24px 32px;
    background-color: ${Color.background.soft};
`
const Row = styled.View`
    flex-direction: row;
`
const ChildrenView = styled.View`
`

const Banner = (props: Props) =>{

    return(
        <Container
            style={props.style}
        >
            <Row>
                <props.icon 
                    style={{marginRight: 8}}
                    color={Color.text.primary}
                    height={18}
                    width={18}
                />
                <Text
                    type='c1'
                    style={{color: Color.text.primary, marginBottom: 8}}
                >
                    {props.title}
                </Text>
            </Row>
            <ChildrenView>
                {props.children}
            </ChildrenView>
            {props.buttonProps &&
                <Button
                    style={{height: 36, alignSelf: 'flex-end'}}
                    {...props.buttonProps}
                />
            }
        </Container>
    )
}
export default Banner;
export interface Props {
    position: "top" | "bottom" | "center",
    title: string,
    icon: any,
    buttonProps?: any,
    style?: ViewStyle,
    children?: any
}