import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Color from '../../constants/Color';
import Button from '../Button/Button';

const Container = styled.View`
`
const ButtonView = styled.Pressable`
    flex-direction: row;
`

const CheckboxButton = (props: Props) =>{

    const [ selection, setSelection ] = useState<number>(props.selection ? props.selection : 0);

    useEffect(() =>{
        if(props.selection !== undefined){
            setSelection(props.selection);
        }
    },[props.selection]);

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
                        marginRight: 4, 
                        backgroundColor: props.error && selection === 1 ? Color.status.color.errorDefault : selection === 1 ? Color.status.color.successDefault: undefined
                    }}
                    textColor={selection === 1 ? Color.text.full : Color.text.high}
                    title={props.noString ? props.noString : 'No'}
                    size='small'
                    onPress={() => onCellPress(1)}
                />
                <Button
                    style={{
                        flex: 1, 
                        borderWidth: (props.error && selection === 2) ? 2 : selection === 2 ? 2 : 1, 
                        borderColor: props.error && selection === 2 ? Color.status.color.error : selection === 2 ? Color.line.greenSoft : Color.line.soft, 
                        marginLeft: 4, 
                        backgroundColor: props.error && selection === 2 ? Color.status.color.errorDefault : selection === 2 ? Color.status.color.successDefault : undefined
                    }}
                    textColor={selection === 2 ? Color.text.full : Color.text.high}
                    title={props.yesString ? props.yesString : 'Si'}
                    size='small'
                    onPress={() => onCellPress(2)}
                />
            </ButtonView>
        </Container>
    )
}
export default CheckboxButton;
export interface Props{
    style?: ViewStyle,
    selection?: 0 | 1 | 2,
    onChange?: Function,
    error?: boolean,
    yesString?: string,
    noString?: string,
    errorString?: string
}