import React, { FC } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';

export const keyStyle = StyleSheet.create({
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
        height: 72,
        width: 72,
        borderRadius: 72/2,
        margin: 8,
        backgroundColor: Color.status.neutralDark.default,
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
        { mainText: '3' }
    ],
    [
        { mainText: '4' },
        { mainText: '5' },
        { mainText: '6' }
    ],
    [
        { mainText: '7' },
        { mainText: '8' },
        { mainText: '9' }
    ],
    [
        { mainText: '*' },
        { mainText: '0' },
        { mainText: '#' }
    ]
];

const Keyboard: FC<Props> = props =>{
        
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
                style={keyStyle.wrapperIn}
                underlayColor={Color.status.neutralDark.pressed}
                onPress={() => _onPress(key.mainText)}
            >
                <View style={[keyStyle.bd]}>
                    <Text 
                        type='h3'
                        weight='regular'
                        style={{color: Color.text.white}}
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
                <View key={groupIndex} style={keyStyle.row}>
                    {group.map(_renderKey.bind(this))}
                </View>
            );
        });
    }

    return (
        <View style={keyStyle.wrapperOut}>
            <View style={keyStyle.main}>
                {_renderNumberKeys()}
            </View>
        </View>
    );
}

export default Keyboard;
export interface Props {
    onKeyPress?: Function,
    ref?: any
}