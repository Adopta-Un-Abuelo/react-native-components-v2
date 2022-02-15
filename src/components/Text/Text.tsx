import React from 'react';
import { TextProps, TextStyle } from 'react-native';

import Display from './TextDisplay';
import Header from './TextHeader';
import Paragraph from './TextParagraph';
import Button from './TextButton';
import Caption from './TextCaption';
import Overline from './TextOverline';

const Text = (props: Props) =>{

    return(
        props.type === 'd1' || props.type === 'd2' ?
            <Display {...props}>
                {props.children}
            </Display>
        : props.type === 'h1' || props.type === 'h2' || props.type === 'h3' || props.type === 'h4' || props.type === 'h5' || props.type === 'h6' ?
            <Header {...props}>
                {props.children}
            </Header>
        : props.type === 'b1' || props.type === 'b2' ?
            <Button {...props}>
                {props.children}
            </Button>
        : props.type === 'p1' || props.type === 'p2' ?
            <Paragraph {...props}>
                {props.children}
            </Paragraph>
        : props.type === 'c1' || props.type === 'c2' ?
            <Caption {...props}>
                {props.children}
            </Caption>
         : props.type === 'o1' ?
            <Overline {...props}>
                {props.children}
            </Overline>
        : 
            <Paragraph {...props}>
                {props.children}
            </Paragraph>
    )
}
export default Text;
export interface Props extends TextProps{
    type?: 'd1' | 'd2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b1' | 'b2' | 'p1' | 'p2' | 'c1' | 'c2' | 'o1',
    weight?: 'regular' | 'semibold' | 'medium',
    style?: TextStyle
}