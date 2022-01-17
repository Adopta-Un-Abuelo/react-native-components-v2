import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import stripe from 'tipsi-stripe';

import Input from '../Input/Input';
import { DollarSign, User } from 'react-native-feather';

const Container = styled.View``
const Row = styled.View`
    flex-direction: row;
    margin-top: 16px;
`

const PaymentMethodForm: FC<Props> = props =>{

    const [ iban, setIban ] = useState('');
    const [ name, setName ] = useState();
    const [ ibanError, setIbanError ] = useState(false);
    const [ nameError, setNameError ] = useState(false);
    
    const onIBANChange = text =>{
        setIbanError(false);
        if(text.length < iban.length){
            if(text.length === 4 || text.length === 9 || text.length === 14 || text.length === 19 || text.length === 24)
                setIban(text.slice(0, -1));
            else
                setIban(text);
        }
        else{
            if(text.length === 4 || text.length === 9 || text.length === 14 || text.length === 19 || text.length === 24) 
                setIban(text+' ');
            else
                setIban(text);
        }
        if(text.length === 29) checkIBAN(text, name);
    }

    const onNameChange = text =>{
        setName(text);
        setNameError(false);
        if(text.length === 3){
            checkIBAN(iban, text);
        }
    }

    const checkIBAN = async (iban, name) =>{
        if(iban && name){
            try{
                props.onChange && props.onChange({
                    status: 'loading',
                    result: undefined
                });
                const result = await stripe.createSourceWithParams({
                    type: 'sepaDebit',
                    currency: 'eur',
                    sepaDebitDetails:{
                        iban: iban
                    },
                    owner:{
                        name: name
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
                placeholder={props.translation ? props.translation.form_payment_method_credit_card : 'Nombre del titular'}
                icon={User}
                onChangeText={onNameChange}
                error={nameError}
                value={name}
            />
            <Input
                style={{marginTop: 16}}
                placeholder={props.translation ? props.translation.form_payment_method_cvc : 'Cuenta bancaría (IBAN)'}
                icon={DollarSign}
                onChangeText={onIBANChange}
                error={ibanError}
                value={iban}
                maxLength={29}
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