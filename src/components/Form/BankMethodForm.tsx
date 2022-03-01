import React, { forwardRef, useState, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components/native';

import Input from '../Input/Input';
import { Landmark, User } from 'react-native-lucide';

const ScrollView = styled.ScrollView``

const BankMethodForm = forwardRef((props: Props, ref: Ref<BankMethodFormRef>) =>{

    const [ iban, setIban ] = useState('');
    const [ name, setName ] = useState();
    const [ ibanError, setIbanError ] = useState(false);
    const [ nameError, setNameError ] = useState(false);
    
    useImperativeHandle(ref, () => ({
        async generateToken(){
            return await generateToken(iban, name)
        }
    }));

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
    }

    const onNameChange = text =>{
        setName(text);
        setNameError(false);
    }

    const generateToken = async (iban, name) =>{
        if(iban && name){
            try{
                return {
                    status: 'ok',
                    result: {
                        type: 'sepa_debit',
                        data:{
                            iban: iban,
                            name: name
                        }
                    }
                }
            } 
            catch(e){
                console.error(e);
                return {
                    status: 'error',
                    error: e
                };
            }
        }
        else{
            setIbanError(true);
            setNameError(true);
            return {
                status: 'error'
            };
            
        }
    }
    return(
        <ScrollView
            style={props.style}
        >
            <Input
                placeholder={props.translation ? props.translation.form_payment_method_name : 'Nombre del titular'}
                icon={User}
                onChangeText={onNameChange}
                error={nameError}
                value={name}
            />
            <Input
                style={{marginTop: 8}}
                placeholder={props.translation ? props.translation.form_payment_method_sepa_debit : 'Cuenta bancaría (IBAN)'}
                icon={Landmark}
                onChangeText={onIBANChange}
                error={ibanError}
                value={iban}
                maxLength={29}
            />
        </ScrollView>
    )
})
export default BankMethodForm;
export interface Props{
    translation: {
		[key: string]: any
	},
    style?: Object,
    currentUser: any
}
export interface BankMethodFormRef{
    generateToken: () => Promise<{
        status: string,
        result?: Object,
        error?: any
    }>
}