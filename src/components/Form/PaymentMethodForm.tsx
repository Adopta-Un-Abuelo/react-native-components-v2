import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { createPaymentMethod, CardField } from '@stripe/stripe-react-native';

import Color from '../../constants/Color';

const Container = styled.View``

const PaymentMethodForm: FC<Props> = props =>{

    const [ isFocus, setIsFocus ] = useState(false);

    const onCardChange = async (cardDetails) =>{
        if(cardDetails.complete){
            try{
                props.onChange && props.onChange({
                    status: 'loading',
                    result: undefined
                });
                const result = await createPaymentMethod({
                    type: 'Card',
                    ...cardDetails
                });
                props.onChange && props.onChange({
                    status: 'ok',
                    result: result.paymentMethod
                });
            } catch(e){
                console.error(e);
                props.onChange && props.onChange({
                    status: 'error',
                    result: e
                });
            }
        }
    }

    return(
        <Container
            style={props.style}
        >
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: props.translation.form_payment_method_credit_card,
                    expiration: props.translation.form_payment_method_date
                }}
                cardStyle={{
                    backgroundColor: isFocus ? '#ffffff' : Color.gray6,
                    textColor: Color.gray2,
                    fontFamily: 'Poppins-Regular',
                    borderRadius: 24,
                    borderWidth: isFocus ? 1 : 0,
                    borderColor: isFocus ? Color.gray3 : 'transparent',
                    cursorColor: Color.blue3
                }}
                style={{
                    width: '100%',
                    height: 64
                }}
                onCardChange={onCardChange}
                onFocus={() =>  setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </Container>
    )
}
export default PaymentMethodForm;
export interface Props{
    translation: {
		[key: string]: any
	},
    style?: Object,
    onChange?: Function
}