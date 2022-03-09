import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TextStyle } from 'react-native';
import { Hash } from 'react-native-lucide';
import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.View`
    flex-direction: row;
`
const Cell = styled.View`
    height: 22px;
    background-color: white;
    padding: 0px 8px;
    flex-direction: row;
    align-items: center;
    border-radius: 11px;
    margin-right: 8px;
    border-width: 1px;
    border-color: ${Color.line.primary};
`

const Header = (props: Props) =>{
    return(
        <Container
            style={props.style}
        >
            {props.options.map((item, index) =>(
                <Cell
                    key={item+index}
                    style={props.optionStyle}
                >
                    {!props.hideIcon &&
                        <Hash color={Color.background.deepBlue} height={10} width={10}/>
                    }
                    <Text
                        style={{fontSize: 12, color: Color.background.primary, ...props.textStyle}}
                    >
                        {item.toLowerCase()}
                    </Text>
                </Cell>
            ))}
        </Container>
    )
}
export default Header;
export interface Props{
    style?: ViewStyle,
    optionStyle?: ViewStyle,
    options: Array<string>,
    hideIcon?: boolean,
    textStyle?: TextStyle,
}