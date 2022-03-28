import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';
import Button from '../Button/Button';

const Container = styled.View`
`
const ButtonView = styled.View`
    flex-direction: row;
    padding: 0px 56px;
`

const CheckboxButton = (props: Props) =>{

    const [ selection, setSelection ] = useState<number>(undefined);

    const onCellPress = (id) => {
        setSelection(id);
        const answer = id === 1 ? props.translation.general_no : props.translation.general_yes;
        props.onChange && props.onChange(answer);
    }

    return(
        <Container
            style={props.style}
        >
            <ButtonView>
                <Button
                    style={{flex: 1, marginRight: 4, backgroundColor: props.error && selection === 1 ? Color.status.color.error : selection === 1 ? Color.status.primary.default : Color.status.primary.softDefault}}
                    color={selection === 1 ? Color.text.white : Color.text.primary}
                    title={props.translation.general_no}
                    size='small'
                    onPress={() => onCellPress(1)}
                />
                <Button
                    style={{flex: 1, marginLeft: 4, backgroundColor: props.error && selection === 2 ? Color.status.color.error : selection === 2 ? Color.status.primary.default : Color.status.primary.softDefault}}
                    color={selection === 2 ? Color.text.white : Color.text.primary}
                    title={props.translation.general_yes}
                    size='small'
                    onPress={() => onCellPress(2)}
                />
            </ButtonView>
            {props.error &&
                <Text
                    type='p2'
                    weight='medium'
                    style={{marginTop: 4, textAlign: 'center', color: Color.status.color.error}}
                >
                    {props.translation.general_cb_error}
                </Text>
            }
        </Container>
    )
}
export default CheckboxButton;
export interface Props{
    translation: {
		[key: string]: any
	},
    style?: ViewStyle,
    onChange?: Function,
    error?: boolean
}