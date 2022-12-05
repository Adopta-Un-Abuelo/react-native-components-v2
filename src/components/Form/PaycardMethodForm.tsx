import React, { forwardRef, useState, Ref, useImperativeHandle, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { createPaymentMethod, CardField } from '@stripe/stripe-react-native';
import Color from 'react-native-components-v2/src/constants/Color';
import Modal from 'react-native-components-v2/src/components/Modal/Modal';
import { Keyboard } from 'react-native';
import Text from 'react-native-components-v2/src/components/Text/Text';
import { Lock } from 'lucide-react-native';

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

const PaycardMethodForm = forwardRef((props: Props, ref: Ref<PaymentMethodFormRef>) =>{

    const paycardForm = useRef<PaymentMethodFormRef>();
    const [ visible, setVisible ] = useState(props.visible);
    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);

    const [ isFocus, setIsFocus ] = useState(false);
    const [ cardDetails, setCardDetails ] = useState(undefined);

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    // useImperativeHandle(ref, () => ({
    //     async generateToken(){
    //         return await generateToken();
    //     }
    // }));

    const generateToken = async () =>{
        // if(cardDetails){
        //     try{
        //         const result = await createPaymentMethod({
        //             paymentMethodType: 'Card',
        //             billingDetails:{
        //                 name: props.currentUser.name,
        //                 phone: props.currentUser.phone,
        //                 email: props.currentUser.email
        //             },
        //             ...cardDetails
        //         });
        //         return {
        //             status: 'ok',
        //             result: {
        //                 type: 'card',
        //                 data: result.paymentMethod
        //             }
        //         };
        //     } catch(e){
        //         console.error(e);
        //         return{
        //             status: 'error',
        //             error: e
        //         };
        //     }
        // }
    }

    const onDismiss = () => {
        setVisible(false);
        props.onDismiss && props.onDismiss();
    }

    const onSavePress = async () =>{
        Keyboard.dismiss();        
            // setLoading(true);
            // const result = await paycardForm?.current.generateToken();
            // if(result && result.status === 'ok'){
            //     props.onChange && props.onChange(result.result);
            //     onDismiss();
            // } else {
            //     setError(true);
            // }
            // setLoading(false);
    }

    const onCardChange = async (cardDetails) =>{
        if(cardDetails.complete){
            setCardDetails(cardDetails);
        }
    }

    return(
        <Modal
            visible={visible}
            orientation={'fullScreen'}
            showTopClose={true}
            avoidKeyboard={true}
            showBottomClose={false}
            canGoBack={true}
            title={props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir método de pago'}
            buttonProps={{
                title: props.translation ? props.translation.payment_method_modal_btn_save_card : 'Guardar tarjeta',
                loading: loading,
                onPress: onSavePress
            }}
            onDismiss={onDismiss}
            onModalHide={onDismiss}
        >
            <Container>
                <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: props.translation.form_payment_method_credit_card,
                        expiration: props.translation.form_payment_method_date
                    }}
                    cardStyle={{
                        fontFamily: 'Poppins-Regular',
                        borderRadius: 12,
                        borderWidth: isFocus ? 2 : 1,
                        borderColor: isFocus ? Color.line.primarySoft : Color.line.soft,
                        cursorColor: Color.text.primary
                    }}
                    style={{
                        width: '100%',
                        height: 56
                    }}
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
                    {props.translation ? props.translation.payment_method_modal_error : 'Parece que los datos de tu método de pago no son correctos.'}
                </Text>
            }
            <ContainerSecure>
                <Row style={{alignItems: 'flex-start'}}>
                    <Lock height={20} width={20} color={Color.text.primary}/>
                    <Text
                        type='c1'
                        style={{color: Color.text.high, flex: 1, marginLeft: 8}}
                    >
                        {props.translation ? props.translation.payment_method_modal_secure : 'Tu información de pago se guardará de forma segura. Más información.'}
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
export interface PaymentMethodFormRef{
    generateToken: () => Promise<{
        status: string,
        result?: Object,
        error?: any
    }>
}