import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Plus, ChevronDown } from 'lucide-react-native';
import { Platform } from 'react-native';
import { isApplePaySupported, isGooglePaySupported } from '@stripe/stripe-react-native';
import Color from '../../constants/Color';
import PaycardLogos from '../../constants/Paycard';
import Text from '../Text/Text';
import PaymentSelectMethodModal from '../Modal/PaymentSelectMethodModal';
import PaycardMethodForm from '../Form/PaycardMethodForm';
import { PaycardConst } from 'react-native-components-v2/src/constants';

const RowButton = styled.Pressable`
    flex-direction: row;
    margin-bottom: 22px;
    align-items: center;
`
const PlusButton = styled.Pressable`
    height: 21px;
    width: 32px;
    border-radius: 6px;
    background-color: ${Color.background.primaryLow};
    align-items: center;
    justify-content: center;
`

const PaymentMethodSelect = (props: Props) =>{

    const nativePayment = {
        objectId: Platform.OS === 'ios' ? 'applePay' : 'googlePay',
        title: Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay',
        date: undefined,
        icon: Platform.OS === 'ios' ? PaycardLogos.apple.icon : PaycardLogos.google.icon,
        paymentMethod: undefined,
        default: false
    };

    const addNewCardPayment = {
        objectId: 'addNewCardPayment',
        title: props.translation.payment_select_add_method,
        date: undefined,
        icon: <PlusButton><Plus height={16} width={16} color={Color.text.primary} /></PlusButton>,
        paymentMethod: undefined,
        default: false
    };
    
    const [ paymentMethodSelected, setPaymentMethodSelected ] = useState<any>(nativePayment);
    const [ paymentMethodOptions, setPaymentMethodOptions ] = useState<Array<any>>([]);

    const [ showSelectPaymentMethodModal, setShowSelectPaymentMethodModal ] = useState<boolean>(false);
    const [ showPaycardModal, setShowPaycardModal ] = useState<boolean>(false);
    const creditCardHide = '···· '

    useEffect(() =>{
        // Set payment method options (NATIVE OR CARD)
        onSetPaymentOptions();
    },[props.paymentMethodsUser]);

    const onSetPaymentOptions = () => {
        let paymentOptionsTemp: any = [];
        // Check for user payment methods
        if(props.paymentMethodsUser) {
            props.paymentMethodsUser.map(item =>{
                paymentOptionsTemp.push(item);
            });
        }
        // Check for apple/google pay support
        if((Platform.OS === 'ios' && isApplePaySupported()) || (Platform.OS === 'android' && isGooglePaySupported())){
            paymentOptionsTemp.push(nativePayment);
            paymentOptionsTemp.push(addNewCardPayment);
            props.onPaymentMethodChange && props.onPaymentMethodChange(nativePayment);
        } else{
            paymentOptionsTemp.push(addNewCardPayment);
            props.onPaymentMethodChange && props.onPaymentMethodChange(addNewCardPayment);
        }
        // Set payment options
        setPaymentMethodOptions(paymentOptionsTemp);
        // Check for default paycard
        onSetDefaultPaymentMethod();
    }

    const onSetDefaultPaymentMethod = (paymentMethod?) =>{
        setShowSelectPaymentMethodModal(false);

        if(paymentMethod){
            setPaymentMethodSelected(paymentMethod);
            props.onPaymentMethodChange && props.onPaymentMethodChange(paymentMethod);
        } else{
            // Set payment if user have default card
            if(props.paymentMethodsUser){
                props.paymentMethodsUser.map(item =>{
                    if(item.default){
                        setPaymentMethodSelected(item);
                        props.onPaymentMethodChange && props.onPaymentMethodChange(item);
                    }
                })
            }
        }
    }

    const onSetPaycard = (paymentMethod) => {
        let newPaymentOption = {
            objectId: 'newCard', 
            title: creditCardHide + paymentMethod.Card.last4,
            date: paymentMethod.Card.expMonth + "/" + paymentMethod.Card.expYear,
            icon: PaycardConst[paymentMethod.Card.brand.toLowerCase()].icon,
            paymentMethod: paymentMethod.id,
            default: true
        };
        paymentMethodOptions.unshift(newPaymentOption);
        onSetDefaultPaymentMethod(newPaymentOption);
    }

    return(
        <RowButton
            onPress={() => {setShowSelectPaymentMethodModal(true)}}
        >
            {paymentMethodSelected.objectId !== 'addNewCardPayment' &&
                <paymentMethodSelected.icon height={32} width={32} style={{marginRight: 16}} />
            }
            <Text
                type='p2'
                weight='medium'
                numberOfLines={1}
            >
                {paymentMethodSelected.objectId === 'addNewCardPayment' ? (props.translation.payment_select_add_method) : (paymentMethodSelected.title ? paymentMethodSelected.title : props.translation.payment_select_add_method)}
            </Text>
            <ChevronDown height={16} width={16} color={Color.text.medium} style={{marginLeft: 8}} />
            <PaymentSelectMethodModal                
                expiresString={props.translation.payment_select_method_modal_expires}
                modalTitleString={props.translation.payment_select_method_modal_title}
                currentUser={props.currentUser}
                visible={showSelectPaymentMethodModal}
                paymentMethodOptions={paymentMethodOptions}
                onDismiss={() => setShowSelectPaymentMethodModal(false)}
                onPaymentMethodSelected={onSetDefaultPaymentMethod}
                onModalHide={(showDelete) => setShowPaycardModal(showDelete)}
            />
            <PaycardMethodForm
                translation={props.translation}
                visible={showPaycardModal}
                currentUser={props.currentUser}
                onDismiss={() => setShowPaycardModal(false)}
                onSetPaycard={onSetPaycard}            
            />
        </RowButton>
    )
};
export default PaymentMethodSelect;
export interface Props{
    translation: {
		[key: string]: any
	},
    paymentMethodsUser?: Array<any>,
    currentUser: any,
    onPaymentMethodChange: Function
}