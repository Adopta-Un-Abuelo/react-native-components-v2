import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import stripe from 'tipsi-stripe';

import Input from '../Input/Input';
import { CreditCard, Calendar, Lock } from 'react-native-feather';

const Container = styled.View``
const Row = styled.View`
    flex-direction: row;
    margin-top: 16px;
`

const PaymentMethodForm: FC<Props> = props =>{

    const [ cardNumber, setCardNumber ] = useState('');
    const [ month, setMonth ] = useState<number | undefined>(undefined);
    const [ year, setYear ] = useState<number | undefined>(undefined);
    const [ CVC, setCVC ] = useState();
    const [ cardNumberError, setCardNumberError ] = useState(false);
    const [ dateError, setDateError ] = useState(false);
    const [ cVCError, setCVCError ] = useState(false);
    const [ dateInputValue, setDateInputValue ] = useState('');
    
    const onCardNumberChange = text =>{
        
        setCardNumberError(false);
        if(text.length < cardNumber.length){
            if(text.length === 4 || text.length === 9 || text.length === 14)
                setCardNumber(text.slice(0, -1));
            else
                setCardNumber(text);
        }
        else{
            if(text.length === 4 || text.length === 9 || text.length === 14) 
                setCardNumber(text+' ');
            else
                setCardNumber(text);
        }
        if(text.length === 19) checkCard(text, year, month, CVC);
    }

    const onDateChange = text =>{
        // Check if is removing or writing
        if(month && month > 12) setDateError(true);
        else setDateError(false);
        if(text.length < dateInputValue.length){
            if(text.length === 2)
                setDateInputValue(text.slice(0, -1));
            else
                setDateInputValue(text);
        } else{
            if(text.length === 2) 
                setMonth(text);
                if(text > 12) setDateError(true);
            else if(text.length === 5){
                const year = text.substring(3);
                const date = new Date(20+year, month ? month : 0, 1);
                const today = new Date();
                if(date < today) 
                    setDateError(true);
                else{
                    setYear(year);
                    checkCard(cardNumber, year, month, CVC);
                }
            }
            
            if(text.length === 2)
                setDateInputValue(text+'/');
            else
                setDateInputValue(text);
        }
    }

    const onCVCChange = text =>{
        setCVC(text);
        setCVCError(false);
        if(text.length === 3){
            checkCard(cardNumber, year, month, text);
        }
    }

    const checkCard = async (cardNumber, year, month, cvc) =>{
        if(cardNumber && year && month && cvc){
            try{
                props.onChange && props.onChange({
                    status: 'loading',
                    result: undefined
                });
                const result = await stripe.createPaymentMethod({
                    type: 'Card',
                    card:{
                        number: cardNumber,
                        expMonth: parseInt(month),
                        expYear: parseInt(year),
                        cvc: cvc
                    }
                });
                props.onChange && props.onChange({
                    status: 'ok',
                    result: result
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
            <Input
                placeholder={props.translation.form_payment_method_credit_card}
                icon={CreditCard}
                onChangeText={onCardNumberChange}
                error={cardNumberError}
                keyboardType={'number-pad'}
                maxLength={19}
                value={cardNumber}
            />
            <Row>
                <Input
                    style={{flex: 1, marginRight: 16}}
                    placeholder={props.translation.form_payment_method_date}
                    icon={Calendar}
                    error={dateError}
                    keyboardType={'number-pad'}
                    onChangeText={onDateChange}
                    maxLength={5}
                    value={dateInputValue}
                />
                <Input
                    style={{flex: 1}}
                    placeholder={props.translation.form_payment_method_cvc}
                    icon={Lock}
                    onChangeText={onCVCChange}
                    error={cVCError}
                    keyboardType={'number-pad'}
                    maxLength={3}
                    value={CVC}
                />
            </Row>
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