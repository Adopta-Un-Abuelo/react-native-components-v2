import React, { FC, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import { Plus } from 'react-native-feather';
import { Platform } from 'react-native';
import stripe from 'tipsi-stripe';

import Color from '../../constants/Color';
import PaycardLogos from '../../constants/Paycard';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';
import PaymentMethodModal from '../Modal/PaymentMethodModal';

const ScrollView = styled.ScrollView`
`
const Cell = styled.Pressable`
    flex-direction: row;
    padding: 22px 0px;
    align-items: center;
`
const applePay = 'Apple pay'
const googlePay = 'Google Pay'
const creditCardHidde = '**** **** **** '

const PaymentMethodSelect: FC <Props> = forwardRef((props, ref) =>{

    const nativePayment = {
        id: Platform.OS === 'ios' ? 'applePay' : 'googlePay',
        title: Platform.OS === 'ios' ? applePay : googlePay,
        icon: Platform.OS === 'ios' ? PaycardLogos.apple.icon : PaycardLogos.google.icon,
        paymentMethod: undefined
    };

    const cardPayment = {
        id: 'card',
        title: props.translation.payment_method_select_add_credit_card,
        icon: Plus,
        paymentMethod: undefined
    };

    // Method of payment
    const [ methodSelected, setMethodSelected ] = useState(props.nativePay ? nativePayment : cardPayment)
    const [ options, setOptions ] = useState<Array<{id: string, title: string, icon: any}>>([]);

    // Manage open/close transition
    const [ action, setAction ] = useState<undefined | string>(undefined);

    // Modals
    const [ showSelectModal, setShowSelectModal ] = useState<boolean>(false);
    const [ showPaycardModal, setShowPaycardModal ] = useState<boolean>(false);

    const onDismissModalPayCard = () =>{
        setShowPaycardModal(false);
    }
    const onDismissModalSelect = () =>{
        setAction(undefined);
        setShowSelectModal(false);
        props.onDismiss && props.onDismiss();
    }

    useEffect(() =>{
        if(props.nativePay){
            // Set payment method (NATIVE OR CARD)
            if(stripe.deviceSupportsNativePay() && stripe.canMakeNativePayPayments() && props.nativePay){
                setOptions([nativePayment, cardPayment]);
                props.onChange && props.onChange(nativePayment);
            } else{
                setOptions([cardPayment])
                props.onChange && props.onChange(cardPayment);
            }
        }
    },[]);

    useEffect(() =>{
        setDefaultCard();
    },[props.paymentMethods]);

    useEffect(() =>{
        if(props.showAddCard){
            setShowSelectModal(true);
        }
    },[props.showAddCard]);

    useImperativeHandle(ref, () => ({
        async confirmPaymentIntent(clientSecret){
            return await stripe.authenticatePaymentIntent({ clientSecret: clientSecret });
        }
    }));

    const setDefaultCard = () =>{
        // Set payment if user have default card
        if(props.paymentMethods){
            props.paymentMethods?.map(item =>{
                const isDefault = item.get('default');
                if(isDefault){
                    const method = {
                        id: item.id, 
                        title: creditCardHidde+item.get('last4'),
                        icon: PaycardLogos[item.get('brand').toLowerCase()].icon,
                        paymentMethod: undefined
                    }
                    setMethodSelected(method)
                    props.onChange && props.onChange(item);
                }
            })
        }
    }

    const onShowModalPayCard = () =>{
        if(action === 'goToCard'){
            setShowPaycardModal(true);
            setAction(undefined)
        }
    }

    const onOptionSelected = option => {
        // Select method of payment
        if(option.id === 'applePay' || option.id === 'googlePay') {
            setMethodSelected(option);
        } else if(option.id === 'card') {
            setMethodSelected(cardPayment);
            setAction('goToCard');
        } else {
            setDefaultCard();
        }

        // Close select modal
        setShowSelectModal(false);
        props.onChange && props.onChange(option);
    }

    const onPaycardChange = result => {
        // dismissModalPayCard();
        if(result){
            const method = {
                id: 'newCard',
                title: creditCardHidde+result.card.last4,
                icon: PaycardLogos[(result.card.brand).toLowerCase()].icon,
                paymentMethod: result
            }
            setMethodSelected(method);
            props.onChange && props.onChange(method);
        }
    }

    return(
        <Cell
            style={props.style}
            onPress={() => setShowSelectModal(true)}
        >
            <Modal
                title={props.translation.payment_method_select_modal_payment_method}
                visible={showSelectModal}
                horientation={'bottom'}
                onDismiss={onDismissModalSelect}
                onModalHide={onShowModalPayCard}
            >
                <ScrollView>
                    {props.paymentMethods && props.paymentMethods.map((item, index) =>{
                        const Paycard = item.id === 'newCard' ? item.icon : PaycardLogos[item.get('brand').toLowerCase()].icon;
                        const last4 = item.id === 'newCard' ? item.title : creditCardHidde+item.get('last4');
                        return (
                            <Cell
                                style={{borderBottomWidth: 1, borderBottomColor: Color.gray5}}
                                key={'paymentMethod'+index}
                                onPress={() => onOptionSelected(item)}
                            >
                                <Paycard height={28} width={42}/>
                                <Text
                                    style={{flex: 1, marginLeft: 8}}
                                    numberOfLines={1}
                                >
                                    {last4}
                                </Text>
                            </Cell>
                        )
                    })}
                    {options.map((item, index) =>(
                        <Cell
                            style={{borderBottomWidth: 1, borderBottomColor: Color.gray5}}
                            key={'paymentOption'+index}
                            onPress={() => onOptionSelected(item)}
                        >
                            <item.icon height={28} width={42} stroke={Color.gray3} fill={Color.gray3}/>
                            <Text
                                style={{flex: 1, marginLeft: 8}}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                        </Cell>
                    ))}
                </ScrollView>
            </Modal>
            <PaymentMethodModal
                translation={props.translation}
                visible={showPaycardModal}
                onDismiss={() => {
                    onDismissModalPayCard();
                    props.onDismiss && props.onDismiss()
                }}
                onChange={onPaycardChange}
            />
            <methodSelected.icon height={28} width={42} stroke={Color.gray3} fill={Color.gray3}/>
            <Text
                style={{flex: 1, color: Color.gray4, marginLeft: 8, marginRight: 8}}
                numberOfLines={1}
            >
                {methodSelected.title}
            </Text>
            <Text
                style={{color: Color.gray2}}
            >
                {props.translation.payment_method_select_modify}
            </Text>
        </Cell>
    )
});
export default PaymentMethodSelect;
export interface Props{
    translation: {
		[key: string]: any
	},
    ref?: any,
    style?: Object,
    onChange?: Function,
    paymentMethods?: Array<any>,
    showAddCard?: boolean,
    nativePay?: boolean,
    onDismiss?: Function
}