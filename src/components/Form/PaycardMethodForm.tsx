import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Color from '../../constants/Color';
import Modal from '../Modal/Modal';
import { Keyboard } from 'react-native';
import Text from '../Text/Text';
import { Lock } from 'lucide-react-native';
import { CardField,  BillingDetails, createPaymentMethod } from '@stripe/stripe-react-native';

const Container = styled.View`
    flex: 1;
    margin-top: 32px;
`
const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`
const ContainerSecure = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
`

const PaycardMethodForm = forwardRef((props: Props) =>{

    const [ visible, setVisible ] = useState(props.visible);
    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);

    const [ cardDetails, setCardDetails ] = useState<any>();
    const [ isFocus, setIsFocus ] = useState(false);

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    const onSavePaycard = async () => {
        Keyboard.dismiss(); 
        if(cardDetails && cardDetails.complete) {
            setLoading(true);
            // Gather customer billing information
            const billingDetails: BillingDetails = {
                name: props.currentUser.name,
                phone: props.currentUser.phone,
                email: props.currentUser.email
            };
        
            // Create payment method
            const { paymentMethod, error } = await createPaymentMethod({
                paymentMethodType: 'Card',
                paymentMethodData: { billingDetails }
            });

            // Check if error
            if (error || !paymentMethod) {
                console.log(`Error code: ${error.code}`, error.message);
                setError(true);
                setLoading(false);
                return;
            } 

            // Success
            props.onSetPaycard && props.onSetPaycard(paymentMethod);
            onDismiss();
            setLoading(false);
        } else {
            setError(true);
        }
    };

    const onDismiss = () => {
        setVisible(false);
        props.onDismiss && props.onDismiss();
    }

    const onCardChange = async (cardDetails) =>{
        if(cardDetails.complete){
            setCardDetails(cardDetails);
        } else {
            setCardDetails(undefined);
        }
    }

    return(
        <Modal
            visible={visible}
            orientation={'fullScreen'}
            showTopClose={true}
            title={props.translation ? props.translation.payment_select_add_method : 'Añadir método de pago'}
            onDismiss={onDismiss}
            buttonProps={{
                title: props.translation ? props.translation.payment_select_paycard_save_card : 'Guardar',
                loading: loading,
                onPress: onSavePaycard
            }}
        >
            <Container>

                <CardField
                    placeholders={{
                        number: props.translation.payment_select_paycard_credit_card,
                        cvc: props.translation.payment_select_paycard_cvc,
                        expiration: props.translation.payment_select_paycard_date
                    }}
                    autofocus
                    cardStyle={{
                        fontSize: 16,
                        fontFamily: 'Poppins-Regular',
                        textErrorColor: Color.text.red,
                        borderWidth: isFocus ? 2 : 1,
                        borderColor: isFocus ? Color.line.primarySoft : Color.line.soft,
                        borderRadius: 12
                    }}
                    style={{
                        width: '100%',
                        height: 56
                    }}
                    postalCodeEnabled={false}
                    onCardChange={onCardChange}
                    onFocus={() =>  setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                />
            </Container>
            {error &&
                <Text
                    type='c1'
                    style={{color: Color.status.color.error, marginTop: 24}}
                >
                    {props.translation ? props.translation.payment_select_paycard_error : 'Vaya, parece que los datos de tu método de pago no son correctos.'}
                </Text>
            }
            <ContainerSecure>
                <Row style={{alignItems: 'flex-start'}}>
                    <Lock height={20} width={20} color={Color.text.primary}/>
                    <Text
                        type='c1'
                        style={{color: Color.text.high, flex: 1, marginLeft: 8}}
                    >
                        {props.translation ? props.translation.payment_select_paycard_secure_tip : 'Tu información de pago se guardará de forma segura.'}
                    </Text>
                </Row>
            </ContainerSecure>
        </Modal>
    )
})
export default PaycardMethodForm;
export interface Props{
    translation: {
		[key: string]: any
	},
    visible: boolean,
    currentUser: any,
    onDismiss: Function,
    onSetPaycard: Function,
}