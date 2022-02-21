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
const MainView = styled.Pressable`
    flex-direction: row;
    align-items: center;
`
const Cell = styled.Pressable`
    height: 80px;
    flex-direction: row;
    align-items: center;
`
const CellTextView = styled.View<{show: boolean}>`
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0px 0px 0px 16px;
    border-bottom-color: ${Color.gray5};
    border-bottom-width: ${props => props.show ? '1px' : '0px'};
`
const Column = styled.View`
    flex-direction: column;
    margin-left: 12px;
`
const creditCardHidde = '···· '

const PaymentMethodSelect = forwardRef((props: Props, ref: Ref<SelectPaymentMethodRef>) =>{

    const nativePayment = {
        objectId: Platform.OS === 'ios' ? 'applePay' : 'googlePay',
        title: Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay',
        date: undefined,
        icon: Platform.OS === 'ios' ? PaycardLogos.apple.icon : PaycardLogos.google.icon,
        paymentMethod: undefined
    };

    const cardPayment = {
        objectId: 'new',
        title: props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir forma de pago',
        date: undefined,
        icon: Plus,
        paymentMethod: undefined
    };

    // TODO - Method of payment - Google Pay
    const [ methodSelected, setMethodSelected ] = useState(props.methodsTypes.includes('native') && Platform.OS === 'ios' ? nativePayment : cardPayment)
    const [ options, setOptions ] = useState<Array<{objectId: string, title: string, date: string, icon: any}>>([]);

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
        // if(((Platform.OS === 'ios' && isApplePaySupported()) || Platform.OS === 'android') && props.methodsTypes.includes('native')){
        if(((Platform.OS === 'ios' && isApplePaySupported())) && props.methodsTypes.includes('native')){
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

    const parseDate = (date) => {
        if(date) {
            const formatter = new Intl.DateTimeFormat('es', { month: 'numeric', year: 'numeric' });
            return formatter.format(new Date(date.iso));    
        } else {
            return undefined;
        }
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
                            date: parseDate(item.expDate),
                            icon: PaycardLogos[item.brand.toLowerCase()].icon,
                            paymentMethod: undefined
                        }
                        setMethodSelected(method);
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
                date: parseDate(option.expDate),
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
                    date: parseDate(result.data.Card.expDate),
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
                    date: undefined,
                    icon: PaycardLogos["sepa_debit"].icon,
                    paymentMethod: result.data
                }
                setMethodSelected(method);
                props.onChange && props.onChange(method);
            }
        }
    }

    return(
        <MainView
            style={props.style}
            onPress={() => setShowSelectModal(true)}
        >
            <Modal
                title={props.translation ? props.translation.payment_method_select_modal_payment_method : '¿Cómo quieres pagar?'}
                visible={showSelectModal}
                horientation={'bottom'}
                onDismiss={onDismiss}
                onModalHide={onModalHide}
                showBack={true}
                hideClose={true}
            >
                <ScrollView>
                    {props.paymentMethods && props.paymentMethods.map((item, index) =>{
                        const Paycard = item.objectId === 'newCard' ? item.icon : PaycardLogos[item.brand.toLowerCase()].icon;
                        const last4 = item.objectId === 'newCard' ? item.title : creditCardHidde+item.last4;
                        return (
                            <Cell
                                key={'paymentMethod'+index}
                                onPress={() => onOptionSelected(item)}
                            >
                                <Paycard height={21} width={32}/>
                                <CellTextView
                                    show={true}
                                >
                                    <Text
                                        type='p1'
                                        weight='medium'
                                    >
                                        {last4}
                                    </Text>
                                    {item.expDate &&
                                        <Text
                                            type='c1'
                                            style={{color: Color.gray3}}
                                        >
                                            {parseDate(item.expDate)}
                                        </Text>
                                    }   
                                </CellTextView>
                            </Cell>
                        )
                    })}
                    {options.map((item, index) =>(
                        <Cell
                            key={'paymentOption'+index}
                            onPress={() => onOptionSelected(item)}
                        >
                            <item.icon height={21} width={32} stroke={item.objectId === 'new' ? Color.blue3 : Color.gray3} fill={item.objectId === 'new' ? Color.blue3 : Color.gray3}/>
                            <CellTextView
                                show={item.objectId !== 'new'}
                            >
                                <Text
                                    type='p1'
                                    weight='medium'
                                    style={{color: item.objectId === 'new' ? Color.blue3 : Color.gray2}}
                                >
                                    {item.title}
                                </Text>
                            </CellTextView>
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
            <Column>
                <Text
                    type='p2'
                    style={{color: Color.gray3}}
                    numberOfLines={1}
                >
                    {methodSelected.objectId === 'new' ? (props.translation ? props.translation.payment_method_select_modify_no_payment_method : 'No hay método de pago') : (methodSelected.title ? methodSelected.title : 'Añadir método de pago')}
                </Text>
                <Text
                    type='b2'
                    style={{color: Color.blue3}}
                >
                    {props.translation ? props.translation.payment_method_select_modify : 'Modificar'}
                </Text>
            </Column>
        </MainView>
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