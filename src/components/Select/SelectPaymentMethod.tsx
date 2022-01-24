import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components/native';
import { Plus } from 'react-native-feather';
import { Platform } from 'react-native';
import { isApplePaySupported } from '@stripe/stripe-react-native';

import Color from '../../constants/Color';
import PaycardLogos from '../../constants/Paycard';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';
import PaymentMethodModal, { PaymentMethodModalRef } from '../Modal/PaymentMethodModal';

const ScrollView = styled.ScrollView`
`
const Cell = styled.Pressable`
    flex-direction: row;
    padding: 22px 0px;
    align-items: center;
`
const creditCardHidde = '**** **** **** '

const PaymentMethodSelect = forwardRef((props: Props, ref: Ref<SelectPaymentMethodRef>) =>{

    const nativePayment = {
        objectId: Platform.OS === 'ios' ? 'applePay' : 'googlePay',
        title: Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay',
        icon: Platform.OS === 'ios' ? PaycardLogos.apple.icon : PaycardLogos.google.icon,
        paymentMethod: undefined
    };

    const cardPayment = {
        objectId: 'new',
        title: props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir forma de pago',
        icon: Plus,
        paymentMethod: undefined
    };

    // Method of payment
    const [ methodSelected, setMethodSelected ] = useState(props.methodsTypes.includes('native') ? nativePayment : cardPayment)
    const [ options, setOptions ] = useState<Array<{objectId: string, title: string, icon: any}>>([]);

    // Manage open/close transition
    const [ action, setAction ] = useState<undefined | string>(undefined);

    // Modals
    const [ showSelectModal, setShowSelectModal ] = useState<boolean>(false);
    const [ showPaycardModal, setShowPaycardModal ] = useState<boolean>(false);
    
    const paymentMethodModal = useRef<PaymentMethodModalRef>()

    useImperativeHandle(ref, () => ({
        showAdd(){
            paymentMethodModal.current.show();
        },
        hideAdd(){
            paymentMethodModal.current.hide();
        }
    }));

    useEffect(() =>{
        // Set payment method (NATIVE OR CARD)
        if(((Platform.OS === 'ios' && isApplePaySupported()) || Platform.OS === 'android') && props.methodsTypes.includes('native')){
            setOptions([nativePayment, cardPayment]);
            props.onChange && props.onChange(nativePayment);
        }
        else{
            setOptions([cardPayment])
            props.onChange && props.onChange(cardPayment);
        }
    },[]);

    useEffect(() =>{
        setDefaultCard();
    },[props.paymentMethods]);

    const onDismissModalPayCard = () =>{
        setShowPaycardModal(false);
    }
    const onDismiss = () =>{
        setAction(undefined);
        setShowSelectModal(false);
        props.onDismiss && props.onDismiss();
    }

    const setDefaultCard = (method?) =>{
        if(method){
            setMethodSelected(method)
            props.onChange && props.onChange(method);
        }
        else{
            // Set payment if user have default card
            if(props.paymentMethods){
                props.paymentMethods?.map(item =>{
                    if(item.default){
                        const method = {
                            objectId: item.objectId, 
                            title: creditCardHidde+item.last4,
                            icon: PaycardLogos[item.brand.toLowerCase()].icon,
                            paymentMethod: undefined
                        }
                        setMethodSelected(method)
                        props.onChange && props.onChange(item);
                    }
                })
            }
        }
    }

    const onModalHide = () =>{
        if(action === 'goToNew'){
            setShowPaycardModal(true);
            setAction(undefined)
        }
    }

    const onOptionSelected = option => {
        // Select method of payment
        if(option.objectId === 'applePay' || option.objectId === 'googlePay') {
            setMethodSelected(option);
        } else if(option.objectId === 'new') {
            setMethodSelected(cardPayment);
            setAction('goToNew');
        } else {
            setDefaultCard({
                objectId: option.objectId, 
                title: creditCardHidde+option.last4,
                icon: PaycardLogos[option.brand.toLowerCase()].icon,
                paymentMethod: undefined
            });
        }
        
        // Close select modal
        setShowSelectModal(false);
        props.onChange && props.onChange(option);
    }

    const onPaycardChange = result => {
        if(result){
            if(result.type === "card"){
                const method = {
                    objectId: 'newCard',
                    title: creditCardHidde+result.data.Card.last4,
                    icon: PaycardLogos[(result.data.Card.brand).toLowerCase()].icon,
                    paymentMethod: result.data.id
                }
                setMethodSelected(method);
                props.onChange && props.onChange(method);
            }
            else if(result.type === "sepa_debit"){
                const method = {
                    objectId: 'newCard',
                    title: result.data.iban,
                    icon: PaycardLogos["sepa_debit"].icon,
                    paymentMethod: result.data
                }
                setMethodSelected(method);
                props.onChange && props.onChange(method);
            }
        }
    }

    return(
        <Cell
            style={props.style}
            onPress={() => setShowSelectModal(true)}
        >
            <Modal
                title={props.translation ? props.translation.payment_method_select_modal_payment_method : 'Método de pago'}
                visible={showSelectModal}
                horientation={'bottom'}
                onDismiss={onDismiss}
                onModalHide={onModalHide}
            >
                <ScrollView>
                    {props.paymentMethods && props.paymentMethods.map((item, index) =>{
                        const Paycard = item.objectId === 'newCard' ? item.icon : PaycardLogos[item.brand.toLowerCase()].icon;
                        const last4 = item.objectId === 'newCard' ? item.title : creditCardHidde+item.last4;
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
                ref={paymentMethodModal}
                translation={props.translation}
                visible={showPaycardModal}
                currentUser={props.currentUser}
                methodsTypes={props.methodsTypes}
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
                {props.translation ? props.translation.payment_method_select_modify : 'Modificar'}
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
    paymentMethods?: Array<any>,
    methodsTypes: Array<string>,
    currentUser: any,
    onDismiss?: Function,
    onChange?: (method: {
        objectId: string,
        title: string,
        icon: any,
        paymentMethod: Object
    }) => void,
}
export interface SelectPaymentMethodRef{
    showAdd: () => void,
    hideAdd: () => void
}