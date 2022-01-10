import React from 'react';
import FlashMessage from "react-native-flash-message";
import { AlertTriangle } from 'react-native-feather';

import Color from '../../constants/Color';

const Alert = (props: Props) =>{

    const renderFlashMessageIcon = type =>(
        <AlertTriangle style={{marginRight: 8}} stroke={'white'}/>
    )

    return(
        <FlashMessage 
            style={{
                backgroundColor: Color.warning
            }}
            titleStyle={{
                fontFamily: 'Poppins-Medium'
            }}
            textStyle={{
                fontFamily: 'Poppins-Regular'
            }}
            renderFlashMessageIcon={renderFlashMessageIcon}
            duration={2500}
            {...props}
        />
    )
}
export default Alert;
export interface Props{
    position: 'top',
    type: 'warning'
}