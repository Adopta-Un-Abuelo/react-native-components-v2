import React, { FC, useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';
import styled from 'styled-components/native';

const WrapperOut = styled.View`
    flex-direction: row;
`
const Main = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`
const WrapperIn = styled.TouchableHighlight<{isPressing: boolean}>`
    height: 48px;
    width: 48px;
    border-radius: 100px;
    border-color: ${props => props.isPressing ? Color.line.primary : Color.line.soft};
    border-width: ${props => props.isPressing ? '2px' : '1px'};
    background-color: ${props => props.isPressing ? Color.background.primaryLow : 'white'};
`
const BD = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const numberKeys = [
    { mainText: '1' },
    { mainText: '2' },
    { mainText: '3' },
    { mainText: '4' },
    { mainText: '5' }
];

const KeyboardRating: FC<Props> = props =>{

    const [ selectedOption, setSelectedOption ] = useState<string | undefined>(props.selectedOption);

    useEffect(() =>{
        setSelectedOption(props.selectedOption);
    },[props.selectedOption]);

    const onPress = key =>{
        if (key === '') {
            return;
        } else {
            setSelectedOption(key);
            props.onKeyPress && props.onKeyPress(key);
        }
    }

    return (
        <WrapperOut>
            <Main>
                {numberKeys.map((item, index) =>(
                    <WrapperIn
                        key={index}
                        activeOpacity={1}
                        style={props.style}
                        isPressing={item.mainText === selectedOption}
                        // onShowUnderlay={() => {setIsPressing(true); setIndex(index)}}
                        // onHideUnderlay={() => {setIsPressing(false); setIndex(0)}}
                        underlayColor={Color.status.primary.softDefault}
                        onPress={() => onPress(item.mainText)}
                    >
                        <BD>
                            <Text 
                                type='p1'
                                weight='semibold'
                                style={{color: item.mainText === selectedOption ? Color.text.full : Color.text.high}}
                            >
                                {item.mainText}
                            </Text>
                        </BD>
                    </WrapperIn>
                ))}
            </Main>
        </WrapperOut>
    );
}

export default KeyboardRating;
export interface Props {
    onKeyPress?: Function,
    ref?: any,
    style?: ViewStyle,
    selectedOption?: string
}