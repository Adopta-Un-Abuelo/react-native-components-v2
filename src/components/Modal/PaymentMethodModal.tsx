import React, { FC, useState, useRef, useEffect, forwardRef, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { CreditCard, Landmark, Lock } from 'react-native-lucide';
import Modal from './Modal';
import Text from '../Text/Text';
import PaymentMethodForm, { PaymentMethodFormRef } from '../Form/PaymentMethodForm';
import BankMethodForm, { BankMethodFormRef } from '../Form/BankMethodForm';
import { Color } from '../../constants';

const Container = styled.View`
    flex: 1;
    margin-top: 32px;
`
const Cell = styled.Pressable`
    height: 72px;
    flex-direction: row;
    align-items: center;
`
const CellTextView = styled.View`
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin: 0px 0px 0px 16px;
    border-bottom-color: ${Color.line.soft};
    border-bottom-width: 1px;
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
                        icon: <Landmark height={24} width={24} color={Color.text.full}/>
                    })
                }
                else if(item === 'paycard'){
                    temp.push({
                        id: 'card',
                        title: props.translation ? props.translation.general_credit_card_long : 'Tarjeta de crédito o débito',
                        icon: <CreditCard height={24} width={24} color={Color.text.full}/>
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
            translation={props.translation}
            visible={visible}
            orientation={'fullScreen'}
            showTopClose={true}
            avoidKeyboard={true}
            canGoBack={optionSelected !== undefined}
            showBottomClose={false}
            title={optionSelected ?
                (optionSelected.id === 'card' ? 
                    (props.translation ? props.translation.payment_method_modal_title : 'Datos de tarjeta') : 
                    (props.translation ? props.translation.payment_method_modal_title_bank : 'Datos de cuenta bancaria')) :
                    (props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir método de pago')
            }
            subtitle={!optionSelected && (props.translation ? props.translation.payment_method_modal_sub_title : 'Selecciona cómo quieres realizar la aportación')}
            buttonProps={optionSelected && {
                title: optionSelected.id === 'card' ? (props.translation ? props.translation.payment_method_modal_btn_save_card : 'Guardar tarjeta') : (props.translation ? props.translation.payment_method_modal_btn_save_sepa : 'Guardar cuenta bancaria'),
                loading: loading,
                onPress: onSavePress
            }}
            onDismiss={optionSelected === undefined ? onDismiss : onBackPress}
            onModalHide={optionSelected === undefined ? onDismiss : onBackPress}
        >
            {optionSelected ? 
                <Container>
                    {optionSelected.id === 'card' &&
                        <>
                        <PaymentMethodForm
                            ref={paycardForm}
                            translation={props.translation}
                            currentUser={props.currentUser}
                        />
                        </>
                    }
                    {optionSelected.id === 'sepa_debit' &&
                        <>
                        <BankMethodForm
                            ref={bankForm}
                            translation={props.translation}
                            currentUser={props.currentUser}
                        />
                        </>
                    }
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
                                    style={{color: Color.text.high}}
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