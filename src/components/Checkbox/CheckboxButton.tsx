import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Text from '../Text/Text';
import Color from '../../constants/Color';
import Button from '../Button/Button';

const Container = styled.View`
`
const ButtonView = styled.Pressable`
    flex-direction: row;
`

const CheckboxButton = (props: Props) =>{

    const [ selection, setSelection ] = useState<number>(0);

    const onCellPress = (id) => {
        setSelection(id);
        const answer = id === 1 ? 'false' : 'true';
        props.onChange && props.onChange(answer);
    }

    return(
        <Container
            style={props.style}
        >
            <ButtonView>
                <Button
                    style={{
                        flex: 1, 
                        borderWidth: props.error && selection === 1 ? 2 : selection === 1 ? 2 : 1, 
                        borderColor: props.error && selection === 1 ? Color.status.color.error : selection === 1 ? Color.line.greenSoft : Color.line.soft, 
                        marginRight: 4
                    }}
                    textColor={selection === 1 ? Color.text.full : Color.text.high}
                    backgroundColor={props.error && selection === 1 ? Color.status.color.errorDefault : selection === 1 ? Color.status.color.successDefault: undefined}
                    title={props.translation.global_no}
                    size='small'
                    onPress={() => onCellPress(1)}
                />
                <Button
                    style={{
                        flex: 1, 
                        borderWidth: props.error && selection === 2 ? 2 : selection === 2 ? 2 : 1, 
                        borderColor: props.error && selection === 2 ? Color.status.color.error : selection === 2 ? Color.line.greenSoft : Color.line.soft, 
                        marginLeft: 4
                    }}
                    textColor={selection === 2 ? Color.text.full : Color.text.high}
                    backgroundColor={props.error && selection === 2 ? Color.status.color.errorDefault : selection === 2 ? Color.status.color.successDefault : undefined}
                    title={props.translation.global_yes}
                    size='small'
                    onPress={() => onCellPress(2)}
                />
            </ButtonView>
            {props.error &&
                <Text
                    type='b2'
                    weight='medium'
                    style={{marginTop: 48, color: Color.status.color.error}}
                >
                    {props.translation.global_error}
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