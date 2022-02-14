import React, { forwardRef, useState, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import { createPaymentMethod, CardField } from '@stripe/stripe-react-native';

import Color from '../../constants/Color';

const Container = styled.View``

const PaymentMethodForm = forwardRef((props: Props, ref: Ref<PaymentMethodFormRef>) =>{

    const [ isFocus, setIsFocus ] = useState(false);
    const [ cardDetails, setCardDetails ] = useState(undefined);

    useImperativeHandle(ref, () => ({
        async generateToken(){
            return await generateToken();
        }
    }));

    const generateToken = async () =>{
        if(cardDetails){
            try{
                const result = await createPaymentMethod({
                    type: 'Card',
                    billingDetails:{
                        name: props.currentUser.name,
                        phone: props.currentUser.phone,
                        email: props.currentUser.email
                    },
                    ...cardDetails
                });
                return {
                    status: 'ok',
                    result: {
                        type: 'card',
                        data: result.paymentMethod
                    }
                };
            } 
            catch(e){
                console.error(e);
                return{
                    status: 'error',
                    error: e
                };
            }
        }
    }

    const onCardChange = async (cardDetails) =>{
        if(cardDetails.complete){
            setCardDetails(cardDetails);
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
                    borderColor: Color.gray3,
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
})
export default PaymentMethodForm;
export interface Props{
    translation: {
		[key: string]: any
	},
    style?: Object,
    currentUser: any
}
export interface PaymentMethodFormRef{
    generateToken: () => Promise<{
        status: string,
        result?: Object,
        error?: any
    }>
}