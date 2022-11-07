import React from 'react';
import FlashMessage from "react-native-flash-message";
import { AlertTriangle } from 'lucide-react-native';
import Color from '../../constants/Color';

const Alert = (props: Props) =>{

    const renderFlashMessageIcon = type =>(
        <AlertTriangle style={{marginRight: 8}} color={Color.text.white}/>
    )

    return(
        <FlashMessage 
            style={{
                backgroundColor: Color.status.color.warning
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