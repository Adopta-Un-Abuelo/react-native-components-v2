import React, { FC, useState } from 'react';
import { View, TouchableHighlight, StyleSheet, ViewStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

export const keyStyle = (isPressing) => StyleSheet.create({
    wrapperOut: {
        flexDirection: 'row'
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    wrapperIn: {
        height: 48,
        width: 48,
        borderRadius: 48/2,
        margin: 8,
        borderColor: isPressing ? Color.line.primary : Color.line.soft,
        borderWidth: isPressing ? 2 : 1
    },
    bd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const numberKeys = [
    [
        { mainText: '1' },
        { mainText: '2' },
        { mainText: '3' },
        { mainText: '4' },
        { mainText: '5' }
    ]
];

const KeyboardRating: FC<Props> = props =>{

    const [ isPressing, setIsPressing ] = useState(false);
    // const [ index, setIndex ] = useState(0);

    const _onPress = key =>{
        if (key === '') {
            return;
        } else {
            props.onKeyPress && props.onKeyPress(key);
        }
    }
    
    const _renderKey = (key, index) =>{
        return (
            <TouchableHighlight
                key={index}
                activeOpacity={1}
                style={{...keyStyle(isPressing).wrapperIn, ...props.style}}
                // onShowUnderlay={() => {setIsPressing(true); setIndex(index)}}
                // onHideUnderlay={() => {setIsPressing(false); setIndex(0)}}
                underlayColor={Color.status.primary.softDefault}
                onPress={() => _onPress(key.mainText)}
            >
                <View style={[keyStyle(isPressing).bd]}>
                    <Text 
                        type='p1'
                        weight='semibold'
                        style={{color: Color.text.high}}
                    >
                        {key.mainText}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    const _renderNumberKeys = () =>{
        return numberKeys.map((group, groupIndex) => {
            return (
                <View key={groupIndex} style={keyStyle(isPressing).row}>
                    {group.map(_renderKey.bind(this))}
                </View>
            );
        });
    }

    return (
        <View style={keyStyle(isPressing).wrapperOut}>
            <View style={keyStyle(isPressing).main}>
                {_renderNumberKeys()}
            </View>
        </View>
    );
}

export default KeyboardRating;
export interface Props {
    onKeyPress?: Function,
    ref?: any,
    style?: ViewStyle
}