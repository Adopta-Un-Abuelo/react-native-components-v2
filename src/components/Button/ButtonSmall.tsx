import React, { FC } from 'react';
import styled from 'styled-components/native';
import { ChevronRight } from 'react-native-feather';
import LottieView from 'lottie-react-native';
import { PressableProps } from 'react-native';

import Color from '../../constants/Color';
import Text from '../Text/Text';

const Container = styled.Pressable<{hideIcon?: boolean}>`
    flex-direction: row;
    height: 58px;
    border-radius: 36px;
    background-color: ${props => props.disabled ? Color.blue5+'60' : Color.blue5};
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    padding: ${props => props.hideIcon ? '0px 22px' : '0px 14px 0px 22px'};
`

const Button: FC<Props> = props =>{

    const onPress = (e: any) =>{
        if(!props.loading)
            props.onPress && props.onPress(e);
    }

    return(
        <Container
            style={props.style}
            disabled={props.disabled}
            hideIcon={props.hideIcon}
            onPress={onPress}
        >
            {props.loading ?
                <LottieView 
                    style={{width: 100}}
                    source={require('../../assets/animations/button-loading.json')} 
                    autoPlay
                    loop
                />
            :
                <>
                <Text
                    style={{
                        color: props.color ? props.color : 'white',
                        fontFamily: 'Poppins-SemiBold'
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    adjustsFontSizeToFit={true}
                >
                    {props.title}
                </Text>
                {!props.hideIcon &&
                    <ChevronRight stroke={props.color ? props.color : 'white'}/>
                }
                </>
            }
        </Container>
    )
}
export default Button;
export interface Props extends PressableProps{
    loading?: boolean,
    color?: string,
    title?: string,
    hideIcon?: boolean
}