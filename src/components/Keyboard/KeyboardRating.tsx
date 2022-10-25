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
        height: 48,
        width: 48,
        borderRadius: 48/2,
        margin: 8,
        borderColor: Color.line.soft,
        borderWidth: 1
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
                underlayColor={Color.status.neutralDark.active}
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

export default KeyboardRating;
export interface Props {
    onKeyPress?: Function,
    ref?: any
}