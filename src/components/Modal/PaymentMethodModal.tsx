import React, { FC, useState, useRef, useEffect, forwardRef, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';

import { ChevronRight, CreditCard, DollarSign } from 'react-native-feather';
import Modal from './Modal';
import Text from '../Text/Text';
import PaymentMethodForm, { PaymentMethodFormRef } from '../Form/PaymentMethodForm';
import BankMethodForm, { BankMethodFormRef } from '../Form/BankMethodForm';
import { Color } from '../../constants';
import PaycardLogos from '../../constants/Paycard';

const Container = styled.View`
    flex: 1;
    margin-top: 32px;
`
const InfoView = styled.View`
    flex-direction: row;
    align-items: center;
`
const Separator = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${Color.gray5};
    margin-bottom: 24px;
`
const Cell = styled.Pressable`
    height: 80px;
    flex-direction: row;
    align-items: center;
`
const CellTextView = styled.View`
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin: 0px 0px 0px 16px;
    border-bottom-color: ${Color.gray5};
    border-bottom-width: 1px;
`

const PaymentMethodModal = forwardRef((props: Props, ref: Ref<PaymentMethodModalRef>) =>{

    const bankForm = useRef<BankMethodFormRef>();
    const paycardForm = useRef<PaymentMethodFormRef>();
    const [ visible, setVisible ] = useState(props.visible);
    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);
    const [ optionSelected, setOptionSelected ] = useState(undefined);
    const [ options, setOptions ] = useState([]);

    useImperativeHandle(ref, () => ({
        show(){
            setVisible(true);
        },
        hide(){
            setVisible(false);
        }
    }));

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    useEffect(() =>{
        if(props.methodsTypes && props.methodsTypes.length > 0){
            const temp =[];
            props.methodsTypes.map(item =>{
                if(item === 'sepa_debit'){
                    temp.push({
                        id: 'sepa_debit',
                        title: props.translation ? props.translation.form_payment_method_sepa_debit : 'Cuenta bancaria',
                        icon: <DollarSign height={24} width={24} stroke={Color.gray2}/>
                    })
                }
                else if(item === 'paycard'){
                    temp.push({
                        id: 'card',
                        title: props.translation ? props.translation.general_credit_card_long : 'Tarjeta de crédito o débito',
                        icon: <CreditCard height={24} width={24} stroke={Color.gray2}/>
                    })
                }
            });
            //If there is only one option, preselect it
            if(temp.length === 1)
                setOptionSelected(temp[0]);
            else
                setOptionSelected(undefined)
            setOptions(temp);
        }
    },[props.methodsTypes]);

    const onDismiss = () => {
        setVisible(false);
        setOptionSelected(undefined);
        props.onDismiss && props.onDismiss();
    }

    const onOptionPress = (option) =>{
        setOptionSelected(option);
    }

    const onBackPress = () =>{
        setOptionSelected(undefined);
    }

    const onSavePress = async () =>{
        Keyboard.dismiss();
        if(optionSelected.id === 'card'){
            setLoading(true);
            const result = await paycardForm?.current.generateToken();
            if(result.status === 'ok'){
                props.onChange && props.onChange(result.result);
                onDismiss();
            }
            setLoading(false);
        }
        else if(optionSelected.id === 'sepa_debit'){
            setLoading(true);
            const result = await bankForm?.current.generateToken();
            if(result.status === 'ok'){
                props.onChange && props.onChange(result.result);
                onDismiss();
            }
            setLoading(false);
        }
    }

    return(
        <Modal
            title={optionSelected ?
                (optionSelected.id === 'card' ? 
                    (props.translation ? props.translation.payment_method_modal_title : 'Datos de tarjeta') : 
                    (props.translation ? props.translation.payment_method_modal_title_bank : 'Datos de cuenta bancaria')) :
                    (props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir método de pago')
            }
            subtitle={props.translation ? props.translation.payment_method_modal_sub_title : 'Selecciona cómo quieres realizar la aportación'}
            visible={visible}
            horientation={'fullScreen'}
            onDismiss={onDismiss}
            buttonProps={optionSelected && {
                title: optionSelected.id === 'card' ? (props.translation ? props.translation.payment_method_modal_btn_save_card : 'Guardar tarjeta') : (props.translation ? props.translation.payment_method_modal_btn_save_sepa : 'Guardar cuenta bancaria'),
                loading: loading,
                onPress: onSavePress
            }}
            showBack={true}
            hideClose={true}
            onBackPress={onBackPress}
        >
            {optionSelected ? 
                <Container>
                    {optionSelected.id === 'card' &&
                        <>
                        <PaymentMethodForm
                            ref={paycardForm}
                            translation={props.translation}
                            style={{marginTop: 24, marginBottom: 24}}
                            currentUser={props.currentUser}
                        />
                        {error &&
                            <Text
                                style={{color: Color.error}}
                            >
                                {props.translation ? props.translation.payment_method_modal_error : 'Parece que los datos de tu método de pago no son correctos.'}
                            </Text>
                        }
                        <Separator/>
                        <InfoView
                            style={{marginBottom: 18}}
                        >
                            <PaycardLogos.visa.icon style={{marginRight: 8}} height={32} width={42}/>
                            <PaycardLogos.mastercard.icon style={{marginRight: 8}} height={32} width={42}/>
                            <PaycardLogos.amex.icon style={{marginRight: 12}} height={32} width={42}/>
                            <Text 
                                style={{fontSize: 12, color: Color.gray3}}
                            >
                                {props.translation ? props.translation.payment_method_modal_more : 'y muchas más...'}
                            </Text>
                        </InfoView>
                        </>
                    }
                    {optionSelected.id === 'sepa_debit' &&
                        <>
                        <BankMethodForm
                            ref={bankForm}
                            translation={props.translation}
                            style={{marginTop: 24, marginBottom: 24}}
                            currentUser={props.currentUser}
                        />
                        </>
                    }
                </Container>
            :
                <Container>
                    {options.map((item, index) =>(                    
                        <Cell
                            key={'option'+index}
                            onPress={() => onOptionPress(item)}
                        >
                            {item.icon}
                            <CellTextView>
                                <Text
                                    type='p1'
                                    weight='medium'
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    type='c1'
                                    style={{color: Color.gray3, marginTop: 4}}
                                >
                                    {item.id === 'card' ? (props.translation ? props.translation.payment_method_modal_card : 'Cargo automático a tu tarjeta') : (props.translation ? props.translation.payment_method_modal_sepa : 'Cargo automático en tu cuenta')}
                                </Text>
                            </CellTextView>
                        </Cell>
                    ))}
                </Container>
            }
        </Modal>
    ) 
});
export default PaymentMethodModal;
export interface Props{
    translation: {
		[key: string]: any
	},
    visible: boolean,
    currentUser: any,
    methodsTypes: Array<string>,
    onChange?: Function,
    onDismiss: Function
}
export interface PaymentMethodModalRef{
    show: () => void,
    hide: () => void
}