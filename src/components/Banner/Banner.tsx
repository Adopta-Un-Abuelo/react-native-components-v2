import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';
import Button from '../Button/Button';

const Container = styled.View`
    padding: 24px 32px;
    background-color: ${Color.gray6};
`
const Row = styled.View`
    flex-direction: row;
`
const ChildrenView = styled.View`
`

const Banner: FC<Props> = props =>{

    return(
        <Container
            style={props.style}
        >
            <Row>
                <props.icon 
                    style={{marginRight: 8}}
                    stroke={Color.blue3}
                    height={18}
                    width={18}
                />
                <Text 
                    style={{color: Color.blue3, fontSize: 14, marginBottom: 8}}
                >
                    {props.title}
                </Text>
            </Row>
            <ChildrenView>
                {props.children}
            </ChildrenView>
            {props.buttonProps &&
                <Button
                    style={{height: 36}}
                    size={'small'}
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
    style?: ViewStyle
}